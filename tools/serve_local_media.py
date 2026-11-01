"""Private loopback preview infrastructure with single-byte-range media support."""
import argparse,http.server,os,re
from functools import partial
class MediaHandler(http.server.SimpleHTTPRequestHandler):
 def end_headers(self):
  self.send_header('Accept-Ranges','bytes');super().end_headers()
 def send_head(self):
  self._byte_range=None
  path=self.translate_path(self.path);value=self.headers.get('Range')
  if not value or not os.path.isfile(path):return super().send_head()
  handle=open(path,'rb');stat=os.fstat(handle.fileno());size=stat.st_size
  # A stale If-Range asks for the complete representation instead.
  if self.headers.get('If-Range') and self.headers['If-Range']!=self.date_time_string(stat.st_mtime):
   handle.close();return super().send_head()
  match=re.fullmatch(r'bytes=(\d*)-(\d*)',value.strip())
  try:
   if not match or not any(match.groups()) or size==0:raise ValueError()
   left,right=match.groups()
   if left:start=int(left);end=min(int(right),size-1) if right else size-1
   else:
    suffix=int(right)
    if suffix<=0:raise ValueError()
    start=max(0,size-suffix);end=size-1
   if start>=size or start<0 or end<start:raise ValueError()
  except ValueError:
   handle.close();self.send_response(416);self.send_header('Content-Range',f'bytes */{size}');self.send_header('Content-Length','0');self.end_headers();return None
  self._byte_range=(start,end);handle.seek(start);self.send_response(206)
  self.send_header('Content-type',self.guess_type(path));self.send_header('Content-Range',f'bytes {start}-{end}/{size}');self.send_header('Content-Length',str(end-start+1));self.send_header('Last-Modified',self.date_time_string(stat.st_mtime));self.end_headers();return handle
 def copyfile(self,source,outputfile):
  if self._byte_range is None:return super().copyfile(source,outputfile)
  remaining=self._byte_range[1]-self._byte_range[0]+1
  try:
   while remaining:
    chunk=source.read(min(65536,remaining))
    if not chunk:break
    outputfile.write(chunk);remaining-=len(chunk)
  except (BrokenPipeError,ConnectionResetError):pass
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--port',type=int,required=True);p.add_argument('--directory',required=True);args=p.parse_args()
 print('Preview directory:',os.path.abspath(args.directory),'index exists:',os.path.isfile(os.path.join(args.directory,'index.html')),flush=True)
 server=http.server.ThreadingHTTPServer(('127.0.0.1',args.port),partial(MediaHandler,directory=args.directory));server.serve_forever()

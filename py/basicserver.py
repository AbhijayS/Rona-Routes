# this is very dirty but it works so we'll use it ;)
# runs on PORT 8081

from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import unquote
import Score, DataProcessing, LocWeights

class S(BaseHTTPRequestHandler):
    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-Type', 'text/html')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
    
    def do_GET(self):
        self._set_response()

        # self.wfile.write("GET request for {}".format(self.path).encode('utf-8'))
        path = unquote(self.path[1:])
        path_vars = path.split(',')
        county = path_vars[0]
        category = path_vars[1]
        transport = path_vars[2]
        duration = path_vars[3]

        print("county: |{}|, category: |{}|, transport: |{}|, duration: |{}|".format(county, category, transport, duration))

        try:
            score =  Score.scoreRoute(county=county, locType=category, transport=transport, duration=duration)
        except:
            print("County, category, or transport not found.")
            score = 0
        
        self.wfile.write(str(score).encode('UTF-8'))
    
def main():
    print("Starting on port 8081 ...")
    httpd = HTTPServer(('', 8081), S)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    print("Stopping")

if __name__ =='__main__':
    main()
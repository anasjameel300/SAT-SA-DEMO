#!/usr/bin/env python3
"""
SAT-SA Local Server & Air-Gapped Supervisory Proxy
Serves the Minimalist Supervisory Cockpit and provides local bridge to Ollama
"""

import http.server
import socketserver
import json
import urllib.request
import urllib.error
import os
import sys

PORT = 8080
OLLAMA_BASE_URL = "http://localhost:11434"

class SATSAHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path == '/api/ollama/status':
            self.check_ollama_status()
        else:
            super().do_GET()

    def do_POST(self):
        if self.path == '/api/ollama/generate':
            self.proxy_ollama_generate()
        else:
            self.send_response(404)
            self.end_headers()

    def check_ollama_status(self):
        try:
            req = urllib.request.Request(f"{OLLAMA_BASE_URL}/api/tags")
            with urllib.request.urlopen(req, timeout=2) as response:
                data = json.loads(response.read().decode())
                models = [m.get('name') for m in data.get('models', [])]
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "connected": True,
                    "models": models,
                    "default_model": "qwen2.5:3b" if "qwen2.5:3b" in models else (models[0] if models else "qwen2.5:1.5b")
                }).encode())
        except Exception as e:
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "connected": False,
                "error": str(e),
                "models": []
            }).encode())

    def proxy_ollama_generate(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)

        try:
            req_json = json.loads(post_data.decode())
            if 'options' not in req_json:
                req_json['options'] = {"num_predict": 450, "temperature": 0.2}
            elif 'num_predict' not in req_json['options']:
                req_json['options']['num_predict'] = 450
            post_data = json.dumps(req_json).encode()

            req = urllib.request.Request(
                f"{OLLAMA_BASE_URL}/api/generate",
                data=post_data,
                headers={'Content-Type': 'application/json'}
            )
            with urllib.request.urlopen(req, timeout=120) as response:
                resp_data = response.read()
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(resp_data)
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "error": "Failed to connect to local Ollama daemon",
                "details": str(e)
            }).encode())

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), SATSAHandler) as httpd:
        print(f"================================================================")
        print(f"  SAT-SA Supervisory Analytics Server Running (100% Offline)")
        print(f"  Access Portal at: http://localhost:{PORT}")
        print(f"  Ollama AI Proxy Bridge: Active on {OLLAMA_BASE_URL}")
        print(f"================================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")

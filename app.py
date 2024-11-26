import subprocess
import os

def start_react_server(react_path):
    try:
        print("Starting React server...")
        # Navigate to the React directory and start the server
        react_process = subprocess.Popen(
            ["npm", "install"]
            ["npm", "start"],
            cwd=react_path,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        return react_process
    except Exception as e:
        print(f"Error starting React server: {e}")
        return None

def start_node_server(node_path):
    try:
        print("Starting Node.js server...")
        # Navigate to the Node.js directory and start the server
        node_process = subprocess.Popen(
            ["npm", "install"]
            ["node", "server.js"],  # Adjust the entry file if needed
            cwd=node_path,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        return node_process
    except Exception as e:
        print(f"Error starting Node.js server: {e}")
        return None

def main():
    # Set paths to React and Node.js projects
    react_path = "./frontend"  # Replace with your React project path
    node_path = "./backend"   # Replace with your Node.js project path

    # Start servers
    react_process = start_react_server(react_path)
    node_process = start_node_server(node_path)

    try:
        print("Both servers are running. Press Ctrl+C to stop.")
        while True:
            if react_process.poll() is not None:
                print("React server stopped!")
                break
            if node_process.poll() is not None:
                print("Node.js server stopped!")
                break
    except KeyboardInterrupt:
        print("Shutting down servers...")
    finally:
        # Terminate processes
        if react_process:
            react_process.terminate()
        if node_process:
            node_process.terminate()
        print("Servers shut down.")

if __name__ == "__main__":
    main()

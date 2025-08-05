from dotenv import load_dotenv
load_dotenv()

from app import create_app

app = create_app()

@app.route('/')
def hello_world():
    return 'Hello World'

# main driver function
if __name__ == '__main__':
    app.run(debug=True)
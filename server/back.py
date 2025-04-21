from flask import Flask, request, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/generate", methods=["POST"])
def generate():
    audio = request.files["audio"]
    lyrics = request.form["lyrics"]
    theme = request.form.get("theme", "default")

    # Save files locally
    audio.save("input/audio.mp3")
    with open("input/lyrics.txt", "w") as f:
        f.write(lyrics)

    # Call sync + video generation functions here
    generate_lyrics_video("input/audio.mp3", "input/lyrics.txt", theme)

    return send_file("output/video.mp4", as_attachment=True)

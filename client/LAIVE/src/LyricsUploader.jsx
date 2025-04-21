import React, { useState } from 'react';

export default function LyricsUploader() {
  const [audioFile, setAudioFile] = useState(null);
  const [lyricsFile, setLyricsFile] = useState(null);
  const [genre, setGenre] = useState("pop");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audioFile || !lyricsFile) return alert("Please upload both files");

    const formData = new FormData();
    formData.append("audio", audioFile);
    formData.append("lyrics", lyricsFile);
    formData.append("genre", genre);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert("Upload successful: " + data.message);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Upload Audio & Lyrics</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Audio File</label><br />
          <input type="file" accept="audio/*" onChange={e => setAudioFile(e.target.files[0])} />
        </div>
        <div>
          <label>Lyrics File (.txt)</label><br />
          <input type="file" accept=".txt" onChange={e => setLyricsFile(e.target.files[0])} />
        </div>
        <div>
          <label>Genre</label><br />
          <select 
            value={genre} 
            onChange={e => setGenre(e.target.value)} 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="pop">Pop</option>
            <option value="rock">Rock</option>
            <option value="lofi">Lo-Fi</option>
            <option value="hiphop">Hip-Hop</option>
            <option value="edm">EDM</option>
          </select>
        </div>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Upload
        </button>
      </form>
    </div>
  );
}


import { useState } from "react";

const Ajouter = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateSortie, setDateSortie] = useState("");
  const [imageBase64, setImageBase64] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmite = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Titre et Description sont obligatoires.");
      return;
    }

    const newFilm = {
      id: Date.now(),
      title,
      description,
      dateSortie,
      poster_path: imageBase64,
      isCustom: true,
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("customFilms") || "[]");
    localStorage.setItem("customFilms", JSON.stringify([...existing, newFilm]));

    console.log("Film Added ", newFilm);

    alert("Film Added succesfully");
    setTitle("");
    setDescription("");
    setDateSortie("");
    setImageBase64(null);
  };
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Ajouter Un Film</h2>
      <form onSubmit={handleSubmite}>
        <div>
          <label className="block mb-1 font-medium">Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imageBase64 && (
            <img
              src={imageBase64}
              alt="Aperçu"
              className="mt-2 w-32 h-auto rounded shadow"
            />
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Titre </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description </label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            rows={4}
            required
          />
        </div>

        <div>
          <label>Release Date </label>
          <input
            type="text"
            value={dateSortie}
            onChange={(e) => setDateSortie(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ADD Film
        </button>
      </form>
    </div>
  );
};

export default Ajouter;

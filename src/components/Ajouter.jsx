import { useState } from "react";

const Ajouter = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [dateSortie, setDateSortie] = useState("");
  const [imageBase64, setImageBase64] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmite = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Titre et Description sont obligatoires.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newFilm = {
        id: Date.now(),
        title,
        type,
        rating: parseFloat(rating),
        description,
        dateSortie,
        poster_path: imageBase64,
        isCustom: true,
      };

      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem("customFilms") || "[]");
      localStorage.setItem("customFilms", JSON.stringify([...existing, newFilm]));

      console.log("Film Added ", newFilm);

      alert("Film ajouté avec succès!");
      
      // Reset form
      setTitle("");
      setType("");
      setRating(0);
      setDescription("");
      setDateSortie("");
      setImageBase64(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      alert("Erreur lors de l'ajout du film");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Ajouter un Film</h1>
          <p className="text-gray-400 text-lg">Créez votre propre collection de films</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
            <form onSubmit={handleSubmite} className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-lg font-semibold mb-3">Affiche du film</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-yellow-400 transition-colors"
                  >
                    {imageBase64 ? (
                      <img
                        src={imageBase64}
                        alt="Aperçu"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-gray-400">Cliquez pour télécharger une image</p>
                        <p className="text-gray-500 text-sm mt-1">PNG, JPG jusqu'à 10MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-lg font-semibold mb-3">Titre *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Entrez le titre du film"
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-lg font-semibold mb-3">Synopsis *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Décrivez l'histoire du film..."
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all resize-none"
                  rows={5}
                  required
                />
              </div>

              {/* Type and Rating Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold mb-3">Genre</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  >
                    <option value="">Sélectionnez un genre</option>
                    <option value="Action">Action</option>
                    <option value="Comédie">Comédie</option>
                    <option value="Drame">Drame</option>
                    <option value="Horreur">Horreur</option>
                    <option value="Science-fiction">Science-Fiction</option>
                    <option value="Romance">Romance</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Animation">Animation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-semibold mb-3">Note (/5)</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="4.5"
                    className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                  />
                </div>
              </div>

              {/* Release Date */}
              <div>
                <label className="block text-lg font-semibold mb-3">Date de sortie</label>
                <input
                  type="date"
                  value={dateSortie}
                  onChange={(e) => setDateSortie(e.target.value)}
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-black disabled:text-gray-400 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent"></div>
                    <span>Ajout en cours...</span>
                  </div>
                ) : (
                  "Ajouter le Film"
                )}
              </button>
            </form>
          </div>

          {/* Preview Card */}
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold mb-6">Aperçu</h3>
            
            <div className="bg-gray-800 rounded-xl p-6 space-y-4">
              {imageBase64 && (
                <div className="aspect-[2/3] w-48 mx-auto">
                  <img
                    src={imageBase64}
                    alt="Aperçu du film"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}
              
              <div className="text-center space-y-2">
                <h4 className="text-xl font-bold">
                  {title || "Titre du film"}
                </h4>
                
                <div className="flex items-center justify-center space-x-4">
                  {rating > 0 && (
                    <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-semibold">
                      ⭐ {rating}/5
                    </span>
                  )}
                  {dateSortie && (
                    <span className="text-gray-400">
                      {new Date(dateSortie).getFullYear()}
                    </span>
                  )}
                  {type && (
                    <span className="px-3 py-1 border border-gray-500 rounded-full text-sm">
                      {type}
                    </span>
                  )}
                </div>
                
                {description && (
                  <p className="text-gray-300 text-sm leading-relaxed mt-4">
                    {description.length > 150 
                      ? `${description.substring(0, 150)}...` 
                      : description
                    }
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ajouter;
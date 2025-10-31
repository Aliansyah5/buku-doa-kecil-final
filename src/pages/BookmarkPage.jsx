import { useContext } from "react";
import Layout from "../components/Layout/Layout";
import BookmarkCollection from "../components/BookmarkCollection";
import Form from "../components/Modal/Form";
import { appContext } from "../context/app-context";
import useTitle from "../hooks/useTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faPlus,
  faSort,
  faHands,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function BookmarkPage() {
  const {
    bookmark,
    showModal,
    addNewCollectionAndSyncBookmark,
    deleteAndSyncBookmark,
  } = useContext(appContext);

  useTitle("Bookmark");

  function handleAddNewCollection() {
    showModal(
      <Form
        heading="Tambah Collection"
        preText={"Masukkan nama collection"}
        inputObject={{
          placeholder: "nama collection",
          onSubmit: (name) => {
            addNewCollectionAndSyncBookmark(name);
          },
        }}
      />
    );
  }

  // Separate doa bookmarks from ayat bookmarks
  const doaBookmarks = bookmark
    .flatMap((collection) => collection.lists || [])
    .filter(
      (item) =>
        item.surahNumber && item.surahNumber.toString().startsWith("doa-")
    );

  const ayatCollections = bookmark.filter((collection) =>
    collection.lists.some(
      (item) => !item.surahNumber?.toString().startsWith("doa-")
    )
  );

  const hasAnyBookmarks =
    bookmark.length > 0 &&
    (doaBookmarks.length > 0 || ayatCollections.length > 0);

  return (
    <Layout>
      <div className="px-6 py-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FontAwesomeIcon
                icon={faBookmark}
                className="text-white text-lg"
              />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
              Bookmark
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Kelola koleksi ayat dan doa favorit Anda
          </p>

          {/* Islamic decorative line */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-emerald-300"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <div className="w-4 h-0.5 bg-emerald-300"></div>
            <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
            <div className="w-4 h-0.5 bg-emerald-300"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-emerald-300"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleAddNewCollection}
            className="group bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-3"
          >
            <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FontAwesomeIcon icon={faPlus} className="text-sm" />
            </div>
            <span className="font-medium">Tambah Koleksi</span>
          </button>

          <button className="w-12 h-12 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center group">
            <FontAwesomeIcon
              icon={faSort}
              className="text-gray-600 group-hover:text-emerald-600 transition-colors duration-300"
            />
          </button>
        </div>

        {/* Doa Bookmarks Section */}
        {doaBookmarks.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faHands}
                  className="text-white text-lg"
                />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Doa Tersimpan</h2>
              <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
                {doaBookmarks.length}
              </span>
            </div>
            <div className="space-y-3">
              {doaBookmarks.map((doa) => (
                <div
                  key={doa.id}
                  className="group/doa bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-emerald-100/50 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faBookmark}
                          className="text-white text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-emerald-700 font-medium">
                          {doa.surahName}
                        </p>
                        <p className="text-gray-600 text-sm line-clamp-1">
                          {doa.ayah}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteAndSyncBookmark(doa.id, 1)}
                      className="w-8 h-8 bg-red-50 hover:bg-red-100 rounded-xl flex items-center justify-center transition-colors duration-300 opacity-0 group-hover/doa:opacity-100"
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-red-500 text-sm"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookmark Collections */}
        <div>
          {ayatCollections.length > 0 && (
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <span>Koleksi Ayat</span>
              <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
                {ayatCollections.length}
              </span>
            </h2>
          )}
          {ayatCollections.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {ayatCollections.map((item) => (
                <BookmarkCollection data={item} key={item.collectionId} />
              ))}
            </div>
          ) : !hasAnyBookmarks ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-emerald-100 to-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon
                  icon={faBookmark}
                  className="text-emerald-400 text-3xl"
                />
              </div>
              <h3 className="text-gray-600 text-lg font-semibold mb-2">
                Belum ada bookmark
              </h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
                Mulai tandai ayat-ayat dan doa favorit Anda untuk dibaca kembali
                nanti
              </p>
              <button
                onClick={handleAddNewCollection}
                className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Buat Koleksi Pertama
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}

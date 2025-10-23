import { useContext } from "react";
import Layout from "../components/Layout/Layout";
import FolderPlusIcon from "../assets/folder-plus.svg";
import SortIcon from "../assets/sort-icon.svg";

import BookmarkCollection from "../components/BookmarkCollection";
import Form from "../components/Modal/Form";
import { appContext } from "../context/app-context";
import useTitle from "../hooks/useTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faPlus, faSort } from "@fortawesome/free-solid-svg-icons";

export default function BookmarkPage() {
  const { bookmark, showModal, addNewCollectionAndSyncBookmark } =
    useContext(appContext);

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
            Kelola koleksi ayat favorit Anda
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

        {/* Bookmark Collections */}
        {bookmark.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bookmark.map((item) => (
              <BookmarkCollection data={item} key={item.collectionId} />
            ))}
          </div>
        ) : (
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
              Mulai tandai ayat-ayat favorit Anda untuk dibaca kembali nanti
            </p>
            <button
              onClick={handleAddNewCollection}
              className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Buat Koleksi Pertama
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faFolder,
  faBookmark,
  faEllipsisVertical,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { appContext } from "../context/app-context";
import Form from "./Modal/Form";
import Confirmation from "./Modal/Confirmation";

export default function BookmarkCollection({ data }) {
  const [collectionOpen, setCollectionOpen] = useState(false);
  const {
    showModal,
    replaceModalContent,
    deleteAndSyncBookmark,
    renameCollectionAndSyncBookmark,
    deleteCollectionAndSyncBookmark,
  } = useContext(appContext);

  function handleOpenCollection() {
    setCollectionOpen((prev) => !prev);
  }

  function handleDeleteBookmark(bookmarkId, collectionId) {
    showModal(
      <Confirmation
        heading="Hapus bookmark"
        confirmationObject={{
          element: <p>Yakin ingin hapus bookmark ini?</p>,
          confirmText: "Hapus",
          cancelText: "Batal",
        }}
        onConfirm={() => deleteAndSyncBookmark(bookmarkId, collectionId)}
      />
    );
  }

  function handleCollectionOptions() {
    const additionalButton = [
      {
        label: "Hapus Collection",
        className: "bg-red-500 text-white",
        onClick: () => {
          replaceModalContent(
            <Confirmation
              heading="Hapus collection"
              confirmationObject={{
                element: (
                  <p>
                    Yakin ingin hapus collection{" "}
                    <strong>"{data.collectionName}"</strong> ini?
                  </p>
                ),
                confirmText: "Hapus",
                cancelText: "Batal",
              }}
              onConfirm={() =>
                deleteCollectionAndSyncBookmark(data.collectionId)
              }
            />
          );
        },
      },
    ];
    showModal(
      <Form
        heading={data.collectionName}
        preText={`Collection ini punya ${data.lists.length} bookmark`}
        inputObject={{
          placeholder: "Rubah nama",
          onSubmit: (newName) =>
            renameCollectionAndSyncBookmark(data.collectionId, newName),
          defaultValue: data.collectionName,
        }}
        additionalButton={additionalButton}
      />
    );
  }

  return (
    <div
      className={`group relative bg-white/70 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
        collectionOpen ? "ring-2 ring-emerald-200" : ""
      }`}
    >
      {/* Islamic corner decorations */}
      <div className="absolute top-3 left-3 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <div className="w-3 h-3 border-l-2 border-t-2 border-emerald-400 rounded-tl-xl"></div>
      </div>
      <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <div className="w-3 h-3 border-r-2 border-t-2 border-emerald-400 rounded-tr-xl"></div>
      </div>

      {/* Collection Header */}
      <div className="flex justify-between items-center p-6">
        <button
          onClick={handleOpenCollection}
          className="flex items-center space-x-4 flex-1 group-hover:scale-105 transition-transform duration-300"
        >
          {/* Folder Icon */}
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-md">
            <FontAwesomeIcon icon={faFolder} className="text-white text-lg" />
          </div>

          {/* Collection Info */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              {data.collectionName}
            </h3>
            <p className="text-sm text-gray-600">
              {data.lists.length} bookmark{data.lists.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Expand/Collapse Icon */}
          <div className="ml-auto">
            <FontAwesomeIcon
              icon={collectionOpen ? faChevronDown : faChevronRight}
              className={`text-emerald-600 transition-transform duration-300 ${
                collectionOpen ? "rotate-0" : "rotate-0"
              }`}
            />
          </div>
        </button>

        {/* Options Button */}
        <button
          onClick={handleCollectionOptions}
          className="w-10 h-10 bg-emerald-50 hover:bg-emerald-100 rounded-xl flex items-center justify-center transition-colors duration-300 ml-4"
        >
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className="text-emerald-600"
          />
        </button>
      </div>

      {/* Collection Items */}
      {collectionOpen && (
        <div className="border-t border-emerald-100 bg-gradient-to-b from-emerald-50/30 to-green-50/30">
          {data.lists.length > 0 ? (
            <div className="p-4 space-y-3">
              {data.lists.map((item) => (
                <div
                  key={item.id}
                  className="group/item bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-emerald-100/50 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    {/* Bookmark Info */}
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faBookmark}
                          className="text-white text-sm"
                        />
                      </div>
                      <Link
                        to={`/surah/${item.surahNumber}/${item.ayah}`}
                        className="text-emerald-700 hover:text-emerald-800 font-medium transition-colors duration-300"
                      >
                        {item.surahName} - Ayat {item.ayah}
                      </Link>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() =>
                        handleDeleteBookmark(item.id, data.collectionId)
                      }
                      className="w-8 h-8 bg-red-50 hover:bg-red-100 rounded-xl flex items-center justify-center transition-colors duration-300 opacity-0 group-hover/item:opacity-100"
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
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon
                  icon={faBookmark}
                  className="text-gray-400 text-xl"
                />
              </div>
              <p className="text-gray-500 text-sm">Belum ada bookmark</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

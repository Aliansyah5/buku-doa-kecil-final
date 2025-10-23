import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ListSurahPage from "./pages/ListSurahPage";
import Surah from "./pages/Surah";
import BookmarkPage from "./pages/BookmarkPage";
import SettingPage from "./pages/SettingPage";
import ErrorPage from "./pages/ErrorPage";
import DoaPage from "./pages/DoaPage";
import DzikirPage from "./pages/DzikirPage";
import AppContextProvider from "./provider/AppProvider";

import { loader as SurahLoader } from "./pages/Surah";
import { saveToLocalStorageSurahData } from "./helper/local-storage-helper";
import SholatPage from "./pages/SholatPage";
import Layout from "./pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "list-surah",
        element: <ListSurahPage />,
      },
      {
        path: "sholat",
        element: <SholatPage />,
      },
      {
        path: "doa",
        element: <DoaPage />,
      },
      {
        path: "dzikir",
        element: <DzikirPage />,
      },
      {
        path: "surah/:number/:ayah?",
        element: <Surah />,
        loader: SurahLoader,
      },
      {
        path: "bookmark",
        element: <BookmarkPage />,
      },
      {
        path: "settings",
        element: <SettingPage />,
      },
    ],
  },
]);

function App() {
  if (!localStorage.getItem("surahData")) {
    saveToLocalStorageSurahData(0);
  }

  if (!localStorage.getItem("bookmark")) {
    localStorage.setItem(
      "bookmark",
      JSON.stringify([
        {
          collectionId: "default",
          collectionName: "My Favorite",
          lists: [],
        },
      ])
    );
  }

  if (!localStorage.getItem("settings")) {
    localStorage.setItem(
      "settings",
      JSON.stringify({
        interfaceSetting: {
          arabicFontSize: "kecil",
          showTranslation: true,
          showTransliteration: true,
        },
        qori: "05",
        lokasi: "1425",
        autoLastReadOnVisitedSurah: false,
      })
    );
  }

  return (
    <main className="mb-20 w-full poppins-regular">
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </main>
  );
}

export default App;

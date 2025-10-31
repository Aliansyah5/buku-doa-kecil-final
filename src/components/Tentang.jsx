import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCode,
  faEnvelope,
  faExternalLinkAlt,
  faPalette,
  faDatabase,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faTelegram,
  faFigma,
} from "@fortawesome/free-brands-svg-icons";

export default function Tentang() {
  const InfoCard = ({ icon, title, children, gradient }) => (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-start space-x-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-linear-to-br ${gradient} shadow-sm`}
        >
          <FontAwesomeIcon icon={icon} className="text-white text-sm" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">{title}</h3>
          <div className="text-sm text-gray-600 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  const LinkItem = ({ href, icon, text, color = "emerald" }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center space-x-2 text-${color}-600 hover:text-${color}-700 transition-colors duration-200 group`}
    >
      <FontAwesomeIcon icon={icon} className="text-sm" />
      <span className="group-hover:underline">{text}</span>
      <FontAwesomeIcon
        icon={faExternalLinkAlt}
        className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      />
    </a>
  );

  return (
    <div className="p-5 max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-emerald-500 to-green-600 rounded-2xl mb-4 shadow-lg">
          <FontAwesomeIcon icon={faHeart} className="text-white text-2xl" />
        </div>
        <h2 className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
          Tentang Aplikasi
        </h2>
        <p className="text-gray-600 text-sm max-w-md mx-auto">
          Aplikasi Al-Qur'an Digital untuk memudahkan Anda membaca, memahami,
          dan mengamalkan Al-Qur'an
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        {/* Creator Info */}
        <InfoCard
          icon={faUser}
          title="Pembuat Aplikasi"
          gradient="from-emerald-500 to-green-600"
        >
          <div className="space-y-2">
            <p className="font-semibold text-gray-800">Taufiq Hidayat</p>
            <div className="flex flex-col space-y-1.5">
              <LinkItem
                href="https://t.me/taufiq_h"
                icon={faTelegram}
                text="@taufiq_h"
                color="blue"
              />
              <LinkItem
                href="mailto:taufiqqhidayatt@gmail.com"
                icon={faEnvelope}
                text="taufiqqhidayatt@gmail.com"
                color="red"
              />
            </div>
          </div>
        </InfoCard>

        {/* Tech Stack */}
        <InfoCard
          icon={faCode}
          title="Teknologi"
          gradient="from-blue-500 to-indigo-600"
        >
          <div className="flex flex-wrap gap-2">
            {[
              "ReactJS",
              "React Router v7",
              "TailwindCSS v4",
              "Vite",
              "PWA",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100"
              >
                {tech}
              </span>
            ))}
          </div>
        </InfoCard>

        {/* Repository */}
        <InfoCard
          icon={faGithub}
          title="Repositori"
          gradient="from-gray-700 to-gray-900"
        >
          <LinkItem
            href="https://github.com/taufiq33/quran-frontend"
            icon={faGithub}
            text="github.com/taufiq33/quran-frontend"
            color="gray"
          />
        </InfoCard>

        {/* Design */}
        <InfoCard
          icon={faPalette}
          title="Desain Antarmuka"
          gradient="from-purple-500 to-pink-600"
        >
          <div className="space-y-2">
            <p>
              Original Design by{" "}
              <a
                href="https://www.figma.com/@tanvirux"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
              >
                Tanvir Ahassan
              </a>
            </p>
            <LinkItem
              href="https://www.figma.com/community/file/966921639679380402/quran-app-concept-free"
              icon={faFigma}
              text="Quran App Concept Free"
              color="purple"
            />
          </div>
        </InfoCard>

        {/* API Sources */}
        <InfoCard
          icon={faDatabase}
          title="Sumber Data"
          gradient="from-teal-500 to-cyan-600"
        >
          <div className="space-y-3">
            <div>
              <p className="font-medium text-gray-700 mb-1.5">API Al-Qur'an:</p>
              <LinkItem
                href="https://equran.id/apidev/v2"
                icon={faDatabase}
                text="equran.id/apidev/v2"
                color="teal"
              />
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-1.5">
                API Jadwal Sholat:
              </p>
              <LinkItem
                href="https://documenter.getpostman.com/view/841292/2s9YsGittd"
                icon={faDatabase}
                text="API Muslim v2 by myQuran"
                color="teal"
              />
            </div>
          </div>
        </InfoCard>
      </div>

      {/* Footer */}
      <div className="mt-8 p-4 bg-linear-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
        <p className="text-center text-sm text-gray-600">
          <FontAwesomeIcon icon={faHeart} className="text-red-500 mx-1" />
          Dibuat dengan penuh dedikasi untuk memudahkan umat dalam beribadah
          <FontAwesomeIcon icon={faHeart} className="text-red-500 mx-1" />
        </p>
      </div>

      {/* Contact CTA */}
      <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <p className="text-center text-sm text-blue-700">
          <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
          Ada pertanyaan atau saran? Hubungi:{" "}
          <a
            href="mailto:taufiqqhidayatt@gmail.com"
            className="font-semibold hover:underline"
          >
            taufiqqhidayatt@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}

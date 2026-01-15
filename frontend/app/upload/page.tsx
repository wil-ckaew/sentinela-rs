import Navbar from "@/components/Navbar";
import UploadForm from "@/components/UploadForm";

export default function Upload() {
  return (
    <>
      <Navbar />
      <main className="p-10 max-w-xl">
        <h2 className="text-2xl font-bold mb-4">Upload de Logs</h2>
        <UploadForm />
      </main>
    </>
  );
}

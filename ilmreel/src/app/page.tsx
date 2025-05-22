import Image from "next/image";

export default function Home() {
  return (
   <main>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p className="text-lg">This is a sample text.</p>
      <Image
        src="/path/to/image.jpg"
        alt="Sample Image"
        width={500}
        height={500}
      />
   </main>
  );
}

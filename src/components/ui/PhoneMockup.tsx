import Image from "next/image";

// Téléphone incliné qui flotte, avec une capture à l'intérieur
export function PhoneMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="animate-float mx-2 w-28 shrink-0 min-[400px]:w-36 sm:mx-3 sm:w-48">
      <div className="rotate-[8deg] rounded-[2.2rem] border-[7px] border-[#1c1f29] bg-[#1c1f29] shadow-2xl shadow-violet/25">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[1.7rem] bg-bg-elevated">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="200px"
            className="object-cover"
            unoptimized={src.endsWith(".svg")}
          />
          <span className="absolute top-2 left-1/2 h-4 w-14 -translate-x-1/2 rounded-full bg-[#1c1f29]" aria-hidden />
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import type { ResolvedMedia } from "@/lib/media";
import { FacadeArt } from "./facade-art";

/**
 * Preenche o contêiner pai (que precisa ser `relative` e ter tamanho/aspect).
 * Usa a imagem real do Higgsfield se existir em public/media; senão, o
 * placeholder ilustrado.
 */
export function Media({
  item,
  sizes = "100vw",
  priority = false,
  className = "",
}: {
  item: ResolvedMedia;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (item.src) {
    return (
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }
  return (
    <FacadeArt
      tone={item.tone}
      view={item.view}
      seed={item.id}
      label={item.alt}
      className={className}
    />
  );
}

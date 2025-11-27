import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex items-start relative w-full">
      <div className="flex flex-col flex-1 gap-y-4 w-full">
        {images.map((image, index) => {
          return (
            <div key={image.id} className="relative group w-full">
              {/* Glowing Background Effect */}
              <div
                className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"
              />

              <Container
                className="relative aspect-square w-full overflow-hidden bg-ui-bg-subtle rounded-3xl border border-primary/20 shadow-2xl"
                id={image.id}
              >
                {!!image.url && (
                  <Image
                    src={image.url}
                    priority={index <= 2 ? true : false}
                    className="absolute inset-0 rounded-3xl"
                    alt={`Product image ${index + 1}`}
                    fill
                    sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                )}
              </Container>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery

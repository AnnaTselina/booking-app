import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ICardProps } from "../../types";

const heading = "Finally, please add couple of images";

const DropImages = (props: ICardProps) => {
  const { nextStepCallback, previousStepCallback, setPayload, payload } = props;

  const [images, setImages] = useState<{ src: string }[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setPayload((state) => ({
        ...state,
        images: { value: [...state.images.value, ...acceptedFiles], set: true },
      }));
    },
  });

  useEffect(() => {
    setImages([]);
    payload.images.value.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        setImages((prevState) => [
          ...prevState,
          {
            src: e.target && typeof e.target.result === "string" ? e.target.result : "",
          },
        ]);
      };

      reader.readAsDataURL(file);
    });
  }, [payload.images]);

  const cancelImage = (index: number) => {
    setPayload((state) => {
      state.images.value.splice(index, 1);

      return {
        ...state,
        images: {
          value: state.images.value,
          set: !!state.images.value.length,
        },
      };
    });
  };

  return (
    <div className="add-rental-unit__content-box-form">
      <h3 className="form-heading">{heading}</h3>
      <div className="add-rental-unit__drop-images">
        <div
          {...getRootProps({
            className: `dropzone ${isDragActive ? "drag-active" : ""}`,
          })}
        >
          <input className="input-zone" {...getInputProps()} />
          {isDragActive ? (
            <p>Release to drop the files here</p>
          ) : (
            <>
              <p className="dropzone-content">
                Drag&apos;n&apos;drop some files here, or click to select files
              </p>
              <button type="button" className="btn">
                Click to select files
              </button>
            </>
          )}
        </div>
        <div className="add-rental-unit__drop-images-list">
          {images &&
            images.map((image, ind) => (
              <div className="add-rental-unit__drop-images-list-image" key={`${image.src}`}>
                <div className="add-rental-unit__drop-images-list-image-cancel">
                  <button
                    type="button"
                    onClick={() => {
                      cancelImage(ind);
                    }}
                  >
                    <span className="icon-cancel" />
                  </button>
                </div>

                <img src={image.src} alt="New rental unit" />
              </div>
            ))}
        </div>
      </div>

      <div className="form-button">
        <button
          type="button"
          onClick={() => {
            previousStepCallback();
          }}
        >
          back
        </button>
        <button
          type="button"
          onClick={() => {
            nextStepCallback();
          }}
          disabled={!payload.images.value.length}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default DropImages;

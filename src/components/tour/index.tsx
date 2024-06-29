import { useEffect } from "react";
import Shepherd from "shepherd.js";

interface IProps {
  onActiveTour?: (activeTour: boolean) => void;
}

const FileTour = ({ onActiveTour }: IProps) => {
  useEffect(() => {
    const tourOverlay = document.querySelectorAll(
      ".tour-overlay"
    )[0] as HTMLElement;

    const fileTour = new Shepherd.Tour({
      useModalOverlay: false,
      exitOnEsc: true,

      defaultStepOptions: {
        id: "file-tour",
        classes: "custom-shepherd-theme",
        scrollTo: true,
        cancelIcon: {
          enabled: true,
          label: "exit",
        },
        when: {
          show: () => {
            tourOverlay.style.display = "block";
          },
          hide: () => {
            tourOverlay.style.display = "none";
            onActiveTour;
          },
          complete: () => {
            tourOverlay.style.display = "none";
            onActiveTour;
          },
          cancel: () => {
            tourOverlay.style.display = "none";
            onActiveTour;
          },
        },
      },
    });

    const createStep = (
      id: string,
      content: string,
      element: string,
      where: string,
      disabled?: string
    ) => {
      return {
        id,
        text: content,
        attachTo: {
          element,
          on: where,
        },
        buttons: [
          {
            text: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
      </svg>        
              `,
            action: () => {
              fileTour.back();
            },
          },
          {
            action: () => {
              fileTour.next();
            },
            text: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            `,
            disabled: disabled === "next" && true,
          },
        ],
      };
    };

    const tourSteps = [
      createStep(
        "step2",
        `
            <div class="tour-step-container">
            <h1 class="tour-step-header"> جست و جو </h1>
            <p class="tour-step-text">
            جست و جو در عنوان تمام فایل های موجود، کافیست عنوان مورد نظر را وارد کنید تا جست و جو در فایل ها انجام شود و نتیجه به شما نمایش داده شود.
            </p>
            </div>
        `,
        ".file-search",
        "right-start"
      ),
      createStep(
        "step3",
        `
            <div class="tour-step-container">
            <h1 class="tour-step-header"> جارو  </h1>
            <p class="tour-step-text">
            برای پاک کردن کادر جست و جو 
            </p>
          </div>`,

        ".file-search-delete",
        "bottom"
      ),
      createStep(
        "step4",
        `
          <div class="tour-step-container">
          <h1 class="tour-step-header">نمایش کارتی</h1>
          <p class="tour-step-text">
          امکان نمایش  و انتخاب کارتی فایل ها 
          </p>
        </div>`,
        ".file-card-mode",
        "bottom"
      ),
      createStep(
        "step5",
        `
          <div class="tour-step-container">
          <h1 class="tour-step-header">نمایش جدولی</h1>
          <p class="tour-step-text">
          امکان نمایش  و انتخاب جدولی فایل ها 
          </p>
        </div>`,
        ".file-table-mode",
        "bottom"
      ),
      createStep(
        "step6",
        `
        <div class="tour-step-container">
        <h1 class="tour-step-header">بارگذاری فایل </h1>
        <p class="tour-step-text">
        آپلود فایل از روی حافظه دستگاه کاربر 
        فایل مورد نظر را از روی حافظه دستگاه انتخاب کنید       
        </p>
      </div>`,
        ".file-upload",
        "bottom"
      ),
      createStep(
        "step7",
        `
        <div class="tour-step-container">
        <h1 class="tour-step-header"> عملیات  </h1>
        <p class="tour-step-text">
عملیات مربوط به فایل ها شامل دانلود، حذف و ویرایش نام
        </p>
      </div>`,
        ".file-action",
        "right",
        "next"
      ),
    ];

    tourSteps.forEach((step) => {
      return fileTour.addStep(step as any);
    });

    fileTour.start();

    return () => {
      if (fileTour) {
        tourOverlay.style.display = "none";

        fileTour.hide();
        fileTour.complete();
        fileTour.cancel();
      }
    };
    // }
  }, []);

  return null;
};

export default FileTour;

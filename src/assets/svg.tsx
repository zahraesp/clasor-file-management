interface IProps {
  className: string;
}

export const GridIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
      />
    </svg>
  );
};

export const TableIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
      />
    </svg>
  );
};

export const FillArrow = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 9 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 4.77345L4.5 0L9 4.77345H0Z" />
    </svg>
  );
};

export const DownloadIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );
};

export const ChevronRightIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
};

export const ChevronLeftIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
};

export const PencilIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 21.0574H5C4.46957 21.0574 3.96086 20.8467 3.58578 20.4716C3.21071 20.0965 3 19.5878 3 19.0574V16.0574C3.00223 15.5278 3.21441 15.0208 3.59 14.6474L14.36 3.87738C14.9225 3.31558 15.685 3 16.48 3C17.275 3 18.0375 3.31558 18.6 3.87738L20.15 5.41736C20.7118 5.97986 21.0274 6.74241 21.0274 7.53741C21.0274 8.33242 20.7118 9.09491 20.15 9.65741L18.0842 11.7232C18.0395 11.8015 17.9843 11.8736 17.92 11.9374C17.8576 11.9992 17.7875 12.0525 17.7116 12.0958L9.37 20.4374C9.01137 20.8144 8.51993 21.0368 8 21.0574ZM18.77 8.32739L17.2492 9.84815L14.2716 6.8773L15.81 5.34741C15.9034 5.25473 16.0143 5.18136 16.1361 5.13159C16.2579 5.08183 16.3884 5.05661 16.52 5.05737L16.48 5.03741C16.6212 5.03634 16.7611 5.06519 16.8904 5.12207C17.0196 5.17895 17.1354 5.26252 17.23 5.36737L18.77 6.91736C18.9562 7.10472 19.0608 7.35819 19.0608 7.62238C19.0608 7.88656 18.9562 8.14003 18.77 8.32739ZM5 16.0974L12.856 8.28502L15.8308 11.2666L8 19.0974H5V16.0974ZM14 21.0574H19C19.2652 21.0574 19.5196 20.952 19.7071 20.7645C19.8947 20.5769 20 20.3226 20 20.0574C20 19.7922 19.8947 19.5378 19.7071 19.3503C19.5196 19.1627 19.2652 19.0574 19 19.0574H14C13.7348 19.0574 13.4805 19.1627 13.2929 19.3503C13.1054 19.5378 13 19.7922 13 20.0574C13 20.3226 13.1054 20.5769 13.2929 20.7645C13.4805 20.952 13.7348 21.0574 14 21.0574Z"
        fill="currentColor;"
      />
    </svg>
  );
};

export const XIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.61688 17.4216C7.73872 17.4713 7.86919 17.4965 8.00079 17.4958C8.1324 17.4965 8.26287 17.4713 8.3847 17.4216C8.50654 17.3718 8.61734 17.2985 8.71078 17.2058L12.5008 13.4158L16.2908 17.2058C16.3842 17.2985 16.495 17.3718 16.6169 17.4216C16.7387 17.4713 16.8692 17.4965 17.0008 17.4958C17.1324 17.4965 17.2629 17.4713 17.3847 17.4216C17.5065 17.3718 17.6173 17.2985 17.7108 17.2058C17.897 17.0184 18.0016 16.765 18.0016 16.5008C18.0016 16.2366 17.897 15.9831 17.7108 15.7958L13.9158 12.0008L17.7108 8.20581C17.897 8.01845 18.0016 7.76498 18.0016 7.50079C18.0016 7.23661 17.897 6.98314 17.7108 6.79578C17.6178 6.70205 17.5072 6.62767 17.3854 6.5769C17.2635 6.52614 17.1328 6.5 17.0008 6.5C16.8688 6.5 16.7381 6.52614 16.6162 6.5769C16.4944 6.62767 16.3838 6.70205 16.2908 6.79578L12.5008 10.5858L8.71078 6.79578C8.61782 6.70205 8.50724 6.62767 8.38538 6.5769C8.26352 6.52614 8.13281 6.5 8.00079 6.5C7.86878 6.5 7.73807 6.52614 7.61621 6.5769C7.49435 6.62767 7.38376 6.70205 7.2908 6.79578C7.10455 6.98314 7 7.23661 7 7.50079C7 7.76498 7.10455 8.01845 7.2908 8.20581L11.0858 12.0008L7.2908 15.7958C7.10455 15.9831 7 16.2366 7 16.5008C7 16.765 7.10455 17.0184 7.2908 17.2058C7.38424 17.2985 7.49504 17.3718 7.61688 17.4216Z"
        fill="currentColor;"
      />
    </svg>
  );
};

export const TrashIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.2325 6.00037L14.51 4.56035C14.4283 4.39357 14.3017 4.25282 14.1445 4.15391C13.9873 4.05501 13.8057 4.00184 13.62 4.00035H10.38C10.1943 4.00184 10.0126 4.05501 9.8554 4.15391C9.69821 4.25282 9.57167 4.39357 9.48995 4.56035L8.74753 6.00037H15.2325ZM7.01149 8.00037C7.07341 8.00616 7.13582 8.00618 7.19793 8.00037H16.8491C16.8517 8.00038 16.8543 8.00038 16.8569 8.00037H17V19.0004C17 19.2656 16.8946 19.5199 16.7071 19.7075C16.5196 19.895 16.2652 20.0004 16 20.0004H8C7.73478 20.0004 7.48044 19.895 7.29291 19.7075C7.10537 19.5199 7 19.2656 7 19.0004V8.00037H7.01149ZM6.48995 6.00037L7.65997 3.66038C7.90865 3.16226 8.29103 2.74317 8.76434 2.45C9.23765 2.15683 9.78321 2.00111 10.34 2.00035H13.58C14.1414 1.99178 14.6939 2.14097 15.1748 2.43089C15.6556 2.72082 16.0455 3.13985 16.3 3.64036L17.48 6.00037H18H20C20.2652 6.00037 20.5196 6.10574 20.7071 6.29327C20.8946 6.48081 21 6.73515 21 7.00037C21 7.26558 20.8946 7.51992 20.7071 7.70746C20.5196 7.895 20.2652 8.00037 20 8.00037H19V19.0004C19 19.796 18.6839 20.5591 18.1213 21.1217C17.5587 21.6843 16.7956 22.0004 16 22.0004H8C7.20435 22.0004 6.4413 21.6843 5.87869 21.1217C5.31608 20.5591 5 19.796 5 19.0004V8.00037H4C3.73478 8.00037 3.48044 7.895 3.29291 7.70746C3.10537 7.51992 3 7.26558 3 7.00037C3 6.73515 3.10537 6.48081 3.29291 6.29327C3.48044 6.10574 3.73478 6.00037 4 6.00037H6H6.48995ZM12 18.0004C11.7348 18.0004 11.4804 17.895 11.2929 17.7075C11.1054 17.5199 11 17.2656 11 17.0004V11.0004C11 10.7352 11.1054 10.4808 11.2929 10.2933C11.4804 10.1057 11.7348 10.0004 12 10.0004C12.2652 10.0004 12.5196 10.1057 12.7071 10.2933C12.8946 10.4808 13 10.7352 13 11.0004V17.0004C13 17.2656 12.8946 17.5199 12.7071 17.7075C12.5196 17.895 12.2652 18.0004 12 18.0004Z"
        fill="currentColor;"
      />
    </svg>
  );
};

export const UploadFileIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 22H14C14.2652 22 14.5196 21.8947 14.7071 21.7071C14.8946 21.5196 15 21.2652 15 21C15 20.7348 14.8946 20.4804 14.7071 20.2929C14.5196 20.1054 14.2652 20 14 20H6C5.73478 20 5.48043 19.8947 5.29289 19.7071C5.10536 19.5196 5 19.2652 5 19V5C5 4.73478 5.10536 4.48044 5.29289 4.29291C5.48043 4.10537 5.73478 4 6 4H13.17C13.3023 4.00055 13.4332 4.02736 13.5551 4.07886C13.6769 4.13035 13.7874 4.20553 13.88 4.30002L14 4.42002V6C14 6.26522 14.1054 6.51959 14.2929 6.70712C14.4804 6.89466 14.7348 7 15 7H16.58L16.71 7.13C16.8947 7.31627 16.9989 7.56768 17 7.83002V10C17 10.2652 17.1054 10.5196 17.2929 10.7071C17.4804 10.8947 17.7348 11 18 11C18.2652 11 18.5196 10.8947 18.7071 10.7071C18.8946 10.5196 19 10.2652 19 10V7.83002C18.9993 7.03464 18.6828 6.27209 18.12 5.71002L15.29 2.88C14.7279 2.31723 13.9654 2.0007 13.17 2H6C5.20435 2 4.44129 2.31608 3.87868 2.87869C3.31607 3.4413 3 4.20435 3 5V19C3 19.7956 3.31607 20.5587 3.87868 21.1213C4.44129 21.6839 5.20435 22 6 22ZM20 17C19.8684 17.0008 19.7379 16.9755 19.6161 16.9258C19.4943 16.876 19.3834 16.8027 19.29 16.71L19 16.42V21C19 21.2652 18.8946 21.5196 18.7071 21.7071C18.5196 21.8947 18.2652 22 18 22C17.7348 22 17.4804 21.8947 17.2929 21.7071C17.1054 21.5196 17 21.2652 17 21V16.42L16.71 16.71C16.617 16.8038 16.5064 16.8781 16.3846 16.9289C16.2627 16.9797 16.132 17.0058 16 17.0058C15.868 17.0058 15.7373 16.9797 15.6154 16.9289C15.4936 16.8781 15.383 16.8038 15.29 16.71C15.1038 16.5227 14.9992 16.2692 14.9992 16.005C14.9992 15.7408 15.1038 15.4874 15.29 15.3L17.29 13.3C17.383 13.2063 17.4936 13.1319 17.6154 13.0811C17.7373 13.0303 17.868 13.0042 18 13.0042C18.132 13.0042 18.2627 13.0303 18.3846 13.0811C18.5064 13.1319 18.617 13.2063 18.71 13.3L20.71 15.3C20.8962 15.4874 21.0008 15.7408 21.0008 16.005C21.0008 16.2692 20.8962 16.5227 20.71 16.71C20.6166 16.8027 20.5057 16.876 20.3839 16.9258C20.2621 16.9755 20.1316 17.0008 20 17Z"
        fill="currentColor;"
      />
    </svg>
  );
};

export const FolderIcon = (props: IProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 21 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1.99988 14H8.99988V16H1.99988C0.899878 16 -0.00012207 15.11 -0.00012207 14V2C-0.00012207 0.89 0.889878 0 1.99988 0H7.99988L9.99988 2H17.9999C19.0999 2 19.9999 2.89 19.9999 4V6.17L18.4099 4.59L17.9999 4.17V4H1.99988V14ZM20.9999 10V17C20.9999 18.11 20.1099 19 18.9999 19H12.9999C11.8999 19 10.9999 18.11 10.9999 17V8C10.9999 6.9 11.8999 6 12.9999 6H16.9999L20.9999 10ZM18.9999 11H15.9999V8H12.9999V17H18.9999V11Z" />
    </svg>
  );
};

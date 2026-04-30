type Props = {
    className?: string;
}
export default function Background({ className }: Props) {
    return (

        <svg className={`block ${className ?? ""}`}
            viewBox="0 0 1440 1024"
            preserveAspectRatio="xMidYMid slice" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_120438_13032)">
                <rect width="1440" height="1026" fill="var(--color-surface)" />
                <path d="M-358.39 568.707L-293.914 504.23L-293.846 504.163H-172.545L-220.81 552.428L-233.272 564.889L-282.697 614.314L-276.575 620.453L0.316579 897.328L283.33 614.314L233.888 564.889L230.407 561.391L173.178 504.163H294.48L294.547 504.23L345.082 554.765L404.631 614.314L0.316579 1018.63L-403.998 614.314L-358.39 568.707ZM0.316579 210L233.938 443.622H112.637L0.316579 331.301L-112.004 443.622H-233.305L0.316579 210Z" fill="var(--color-primary)" />
                <path d="M-516.39 568.707L-451.914 504.23L-451.846 504.163H-330.545L-378.81 552.428L-391.272 564.889L-440.697 614.314L-434.575 620.453L-157.683 897.328L125.33 614.314L75.8879 564.889L72.4068 561.391L15.1785 504.163H136.48L136.547 504.23L187.082 554.765L246.631 614.314L-157.683 1018.63L-561.998 614.314L-516.39 568.707ZM-157.683 210L75.9383 443.622H-45.3627L-157.683 331.301L-270.004 443.622H-391.305L-157.683 210Z" fill="var(--color-secondary)" />
                <path d="M-647.387 568.707L-582.911 504.23L-582.843 504.163H-461.542L-509.807 552.428L-522.269 564.889L-571.694 614.314L-565.572 620.453L-288.68 897.328L-5.66722 614.314L-55.1092 564.889L-58.5903 561.391L-115.819 504.163H5.48245L5.54972 504.23L56.0848 554.765L115.634 614.314L-288.68 1018.63L-692.995 614.314L-647.387 568.707ZM-288.68 210L-55.0587 443.622H-176.36L-288.68 331.301L-401.001 443.622H-522.302L-288.68 210Z" fill="var(--color-tertiary)" />
                <foreignObject x="-137.971" y="55.3145" width="912.942" height="1138.37"><div style={{ backdropFilter: "blur(40px)", clipPath: "url(#bgblur_1_120438_13032_clip_path)", height: "100%", width: "100%" }} />
                </foreignObject>
                <path data-figma-bg-blur-radius="80" d="M-57.9708 165.393L658.33 135.315L694.971 1083.61L-21.3293 1113.69L-57.9708 165.393Z" fill="url(#paint0_radial_120438_13032)" />
            </g>
            <defs>
                <clipPath id="bgblur_1_120438_13032_clip_path" transform="translate(137.971 -55.3145)"><path d="M-57.9708 165.393L658.33 135.315L694.971 1083.61L-21.3293 1113.69L-57.9708 165.393Z" />
                </clipPath><radialGradient id="paint0_radial_120438_13032" cx="0" cy="0" r="1" gradientTransform="matrix(66.5001 683 -935.66 825.649 28 275.5)" gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--color-surface)" stopOpacity="0.4" />
                </radialGradient>
                <clipPath id="clip0_120438_13032">
                    <rect width="1440" height="1026" fill="white" />
                </clipPath>
            </defs>
        </svg>

    )
}

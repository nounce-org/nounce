interface LogoProps {
  className?: string;
  format: "logo" | "text";
}

const Logo: React.FC<LogoProps> = ({ className, format }) => {
  switch (format) {
    case "logo":
      return (
        <svg className={className} viewBox="0 0 240 240" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="100%" y1="0%" x2="0%" y2="100%" id="linearGradient-1">
              <stop stop-color="#32C5FF" offset="0%"></stop>
              <stop stop-color="#B620E0" offset="51.2583893%"></stop>
              <stop stop-color="#F7B500" offset="100%"></stop>
            </linearGradient>
          </defs>
          <polygon id="Path" points="100 0 100 80 80 80 80 240 0 240 0 0"></polygon>
          <rect id="Rectangle" fill="url(#linearGradient-1)" x="100" y="100" width="40" height="40"></rect>
          <polygon id="Path" points="240 240 140 240 140 160 160 160 160 0 240 0"></polygon>
        </svg>
      );

    case "text":
      return <div>Set up</div>;

    default:
      return null; // or a default SVG
  }
};

export default Logo;

interface SVGIconProps {
  name: string;
  className?: string;
}

const SVGIcon: React.FC<SVGIconProps> = ({ name, className }) => {
  const shouldUseGradient = className ? !className.includes("fill-") : true;

  const gradientDefs = (
    <defs>
      <linearGradient x1="100%" y1="0%" x2="0%" y2="100%" id="gradient_nounce">
        <stop stop-color="#0284c7" offset="0%"></stop>
        <stop stop-color="#c026d3" offset="50%"></stop>
        <stop stop-color="#ca8a04" offset="100%"></stop>
      </linearGradient>
    </defs>
  );

  const pathProps = shouldUseGradient ? { fill: "url(#gradient_nounce)" } : {};

  return (
    <svg className={className} viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      {shouldUseGradient && gradientDefs}
      {(() => {
        switch (name) {
          case "article":
            return (
              <path
                d="M0,0 L100,0 L100,20 L0,20 L0,0 Z M0,40 L100,40 L100,60 L0,60 L0,40 Z M0,80 L80,80 L80,100 L0,100 L0,80 Z"
                {...pathProps}
              />
            );
          case "event":
            return (
              <path
                d="M100,0 L100,100 L0,100 L0,0 L100,0 Z M80,20 L20,20 L20,80 L80,80 L80,20 Z M60,40 L60,60 L40,60 L40,40 L60,40 Z"
                {...pathProps}
              />
            );
          case "media":
            return (
              <path
                d="M80,0 L80,20 L100,20 L100,100 L0,100 L0,0 L80,0 Z M60,20 L20,20 L20,80 L80,80 L80,40 L60,40 L60,20 Z"
                {...pathProps}
              />
            );
          // Add cases for other icons as needed
          default:
            return null; // or a default path
        }
      })()}
    </svg>
  );
};

export default SVGIcon;

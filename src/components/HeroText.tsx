type HeroTextProps = {
  title?: string;
  coloredText?: string;
  subtitle?: string;
};
const HeroText = ({ title, coloredText, subtitle }: HeroTextProps) => {
  return (
    <div className="space-y-4  text-center ">
      <h1 className="text-gray-700 font-bold text-4xl xl:text-5xl">
        {title} <span className="text-primary">{coloredText}</span>
      </h1>
      <p className="text-gray-500 max-w-xl text-center leading-relaxed sm:mx-auto ">
        {subtitle}
      </p>
    </div>
  );
};

export default HeroText;

import githubic from '../assets/icons/github icon.png';
import gmailic from '../assets/icons/gmail icon.png';
import linkedinic from '../assets/icons/linkedin icon.png';
import whitegit from '../assets/icons/white github icon.png';
import whitegmail from '../assets/icons/white gmail icon.png';
import whitelinkedin from '../assets/icons/white linkedin icon.png';

export default function IconsHolder({ iconSize }: { iconSize: string }) {
  const dark = true;
  return (
    <div>
      <div className="flex gap-1">
        <a
          href="https://github.com/JustBaneIsFine/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={dark ? whitegit : githubic}
            alt="github icon"
            className={`${iconSize} cursor-pointer`}
          />
        </a>

        <a
          href="https://mail.google.com/mail/u/0/?fs=1&to=bane.baki.1997@gmail.com&tf=cm"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={dark ? whitegmail : gmailic}
            alt="gmail icon"
            className={`${iconSize} cursor-pointer`}
          />
        </a>
        <a
          href="https://www.linkedin.com/in/branislav-milosevic-006948186/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={dark ? whitelinkedin : linkedinic}
            alt="linkedin icon"
            className={`${iconSize} cursor-pointer`}
          />
        </a>
      </div>
    </div>
  );
}

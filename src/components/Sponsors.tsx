/* eslint-disable react-dom/no-unsafe-target-blank */
import Image from 'next/image';

export const Sponsors = () => (
  <table className="border-collapse">
    <tbody>
      <tr className="h-56">
        <td className="border-2 border-gray-300 p-3">
          <a
            href="https://clerk.com?utm_source=bizops&utm_medium=website&utm_campaign=partners"
            target="_blank"
            rel="noopener"
          >
            <Image
              src="/assets/images/clerk-logo-dark.png"
              alt="Clerk – Authentication & User Management for Next.js"
              width={260}
              height={224}
            />
          </a>
        </td>
        <td className="border-2 border-gray-300 p-3">
          <a href="https://www.coderabbit.ai?utm_source=bizops&utm_medium=website&utm_campaign=partners" target="_blank" rel="noopener">
            <Image
              src="/assets/images/coderabbit-logo-light.svg"
              alt="CodeRabbit"
              width={260}
              height={224}
            />
          </a>
        </td>
        <td className="border-2 border-gray-300 p-3">
          <a
            href="https://sentry.io/for/nextjs/?utm_source=bizops&utm_medium=website&utm_campaign=partners"
            target="_blank"
            rel="noopener"
          >
            <Image
              src="/assets/images/sentry-dark.png"
              alt="Sentry"
              width={260}
              height={224}
            />
          </a>
        </td>
      </tr>
      <tr className="h-56">
        <td className="border-2 border-gray-300 p-3">
          <a href="https://arcjet.com?utm_source=bizops&utm_medium=website&utm_campaign=partners" target="_blank" rel="noopener">
            <Image
              src="/assets/images/arcjet-light.svg"
              alt="Arcjet"
              width={260}
              height={224}
            />
          </a>
        </td>
        <td className="border-2 border-gray-300 p-3">
          <a href="https://sevalla.com?utm_source=bizops&utm_medium=website&utm_campaign=partners" target="_blank" rel="noopener">
            <Image
              src="/assets/images/sevalla-light.png"
              alt="Sevalla"
              width={260}
              height={224}
            />
          </a>
        </td>
        <td className="border-2 border-gray-300 p-3">
          <a href="https://crowdin.com?utm_source=bizops&utm_medium=website&utm_campaign=partners" target="_blank" rel="noopener">
            <Image
              src="/assets/images/crowdin-dark.png"
              alt="Crowdin"
              width={260}
              height={224}
            />
          </a>
        </td>
      </tr>
      <tr className="h-56">
        <td className="border-2 border-gray-300 p-3">
          <a
            href="https://betterstack.com/?utm_source=bizops&utm_medium=website&utm_campaign=partners"
            target="_blank"
            rel="noopener"
          >
            <Image
              src="/assets/images/better-stack-dark.png"
              alt="Better Stack"
              width={260}
              height={224}
            />
          </a>
        </td>
        <td className="border-2 border-gray-300 p-3">
          <a
            href="https://posthog.com/?utm_source=bizops&utm_medium=website&utm_campaign=partners"
            target="_blank"
            rel="noopener"
          >
            <Image
              src="https://posthog.com/brand/posthog-logo.svg"
              alt="PostHog"
              width={260}
              height={224}
            />
          </a>
        </td>
        <td className="border-2 border-gray-300 p-3">
          <a
            href="https://www.checklyhq.com/?utm_source=bizops&utm_medium=website&utm_campaign=partners"
            target="_blank"
            rel="noopener"
          >
            <Image
              src="/assets/images/checkly-logo-light.png"
              alt="Checkly"
              width={260}
              height={224}
            />
          </a>
        </td>
      </tr>
      <tr className="h-56">
      </tr>
    </tbody>
  </table>
);

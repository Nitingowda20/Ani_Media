export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font-semibold text-center my-7 text-gray-800 dark:text-gray-200">
            Privacy Policy
          </h1>
          <div className="text-md flex flex-col gap-6 text-gray-600 dark:text-gray-400">
            {[
              "At Nitin's Blog, your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you visit our website.",
              "We collect information such as your name, email address, and comments when you interact with the site. This information is used to enhance your experience, respond to your inquiries, and improve the content we offer.",
              "We do not sell, rent, or share your personal information with third parties without your consent, except as required by law. We may use cookies to track your preferences and improve the user experience.",
              "We implement reasonable security measures to protect your personal information from unauthorized access, but please be aware that no method of data transmission over the internet is completely secure.",
              "By using this site, you consent to the collection and use of your information as described in this Privacy Policy. If you do not agree with our practices, please refrain from using our website.",
              "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. We encourage you to review this policy regularly to stay informed about how we protect your information.",
            ].map((paragraph, index) => (
              <p
                key={index}
                className={`opacity-0 translate-y-5 animate-fadeIn delay-${
                  index * 500
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

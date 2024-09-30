export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font font-semibold text-center my-7">
            About Nitin' Blog
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              Welcome to Nitin's Blog! This space is a hub for sharing my
              passion for technology, coding, and the latest in the world of
              software development. As a developer and tech enthusiast, I
              created this blog to offer tutorials, insights, and coding tips
              that make learning and growing in this field fun and accessible.
            </p>

            <p>
              On this blog, you’ll find articles covering topics like full-stack
              development, JavaScript frameworks, database management, and much
              more. Whether you’re new to programming or a seasoned developer,
              there’s something here for everyone!
            </p>

            <p>
              I regularly post tutorials, project ideas, and deep dives into the
              latest technologies. I believe in continuous learning and sharing
              knowledge, so feel free to explore the content, leave comments,
              and connect with other readers.
            </p>
            
            <p>
              Let’s build a strong community of curious learners and developers,
              helping each other grow in this exciting tech journey!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

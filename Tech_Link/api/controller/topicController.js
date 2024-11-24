import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTopic = async (req, res) => {
  const { name } = req.body;

  try {
    // Check if a topic with the same name already exists
    const existingTopic = await prisma.topic.findUnique({
      where: { name },
    });

    if (existingTopic) {
      return res.status(400).json({ error: "Topic already exists" });
    }

    const topic = await prisma.topic.create({
      data: {
        name,
      },
    });
    return res.status(201).json(topic);
  } catch (error) {
    console.error("Error creating topic:", error);
    return res.status(500).json({ error: "Failed to create topic" });
  }
};

export const getTopics = async (req, res) => {
  try {
    const topics = await prisma.topic.findMany({
      orderBy: { name: "asc" }, // Optional: sorts topics alphabetically
    });
    return res.status(200).json(topics);
  } catch (error) {
    console.error("Error fetching topics:", error);
    return res.status(500).json({ error: "Failed to fetch topics" });
  }
};

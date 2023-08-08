export type Story = {
    id: number,
    userId: string,
    userImage: string,
    parentId: number,
    likes: number,
    dislikes: number,
    average: number,
    title: string,
    paragraph: string,
    status: number,
    ts: string,
    crtAt: string,
    crtBy: string,
    updAt: string,
    updBy: string
    users: string;
    childParagraphs: Story[];
}
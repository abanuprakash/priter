export type Story = {
    id: number,
    userId: number,
    parentId: number,
    likes: number,
    dislikes: number,
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
import Image from 'next/image';
import { RandomAvatar } from 'react-random-avatars';

interface IProps {
    userImage: string
}

const UserAvatar = ({ userImage }: IProps) => {
    return (
        <>
            {userImage ?
                <Image
                    src={userImage}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="inline-block h-5 w-5 rounded-full ring-2 ring-green justify-end cursor-pointer"
                />
                :
                <RandomAvatar name={"Guest"} size={20} />
            }
        </>
    );
}

export default UserAvatar;
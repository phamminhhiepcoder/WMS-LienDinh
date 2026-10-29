import type { BrandRecord } from '../types/brand';

export const mockBrands: BrandRecord[] = [
    {
        _id: '1',
        name: 'UGG',
        slug: 'ugg',
        description: 'Nhãn hàng UGG',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH2sGTPA4E775hTXfMEx4fwxwgfKy48KXqNJfgs0fJFQ&s',
        isActive: true,
    },
    {
        _id: '2',
        name: 'TEVA',
        slug: 'teva',
        description: 'Nhãn hàng TEVA',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Teva_sandals_logo.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
        isActive: true,
    },
    {
        _id: '3',
        name: 'KOOLABURRA',
        slug: 'koolaburra',
        description: 'Nhãn hàng KOOLABURRA',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGVD8eiUPWdevjTi1lP1WZeLRAeU-_Tj2G7bibWPuoo1d44zs2ehNEUT0&s=10',
        isActive: true,
    },
    {
        _id: '4',
        name: 'Nike',
        slug: 'nike',
        description: 'Nhãn hàng thời trang và giày thể thao Nike',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg?utm_source=vi.wikipedia.org&utm_campaign=index&utm_content=original',
        isActive: true,
    },
    {
        _id: '5',
        name: 'Adidas',
        slug: 'adidas',
        description: 'Nhãn hàng thời trang và giày thể thao Adidas',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDeFiNdgT5cHFMW2cKHVtDaSGJOx52A5C7xrlpQHebbw&s=10',
        isActive: true,
    },
    {
        _id: '6',
        name: 'Puma',
        slug: 'puma',
        description: 'Nhãn hàng Puma',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdxFMV08xDg8--TTEBcGvfMjqNwBXeulqo4bf8sVDA3XLmuPeZNx6of1bB&s=10',
        isActive: false,
    },
    {
        _id: '7',
        name: 'Converse',
        slug: 'converse',
        description: 'Nhãn hàng giày Converse',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Converse_logo.svg?utm_source=vi.wikipedia.org&utm_campaign=index&utm_content=original',
        isActive: false,
    },
    {
        _id: '8',
        name: 'Vans',
        slug: 'vans',
        description: 'Nhãn hàng giày Vans',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1W8I-5mlBGR8be-HcRQXBogYADfgA7gXybjIzNA4d1pmicHQorgF-V54s&s=10',
        isActive: true,
    },
];

export default mockBrands;
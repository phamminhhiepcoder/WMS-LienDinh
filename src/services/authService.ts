const mockUser = {
  _id: 'admin_001',
  id: 'admin_001',
  fullName: 'Admin WMS',
  name: 'Admin WMS',
  email: 'admin@wms.com',
  role: 'admin',
  avatar: '',
  phone: '0901234567',
  address: 'Hải Phòng, Việt Nam',
  createdAt: '2026-01-01T00:00:00.000Z',
};

export const authService = {
  getMe: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      status: 200,
      data: {
        status: 'success',
        data: mockUser,
      },
    };
  },

  getProfile: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      status: 200,
      data: {
        status: 'success',
        data: mockUser,
      },
    };
  },

  login: async (credentials: {
    email: string;
    password?: string;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (
      credentials.email !== mockUser.email ||
      credentials.password !== 'admin123'
    ) {
      throw new Error('Email hoặc mật khẩu không chính xác');
    }

    const mockToken = 'mock_access_token_admin123';

    return {
      status: 200,
      message: "OK",
      data: {
        status: 'success',
        data: {
          token: mockToken,
          user: mockUser,
        },
      },
    };
  },

  changePassword: async (passwordData: {
    currentPassword?: string;
    newPassword?: string;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!passwordData.currentPassword || !passwordData.newPassword) {
      throw new Error('Vui lòng nhập đầy đủ thông tin mật khẩu');
    }

    return {
      status: 200,
      data: {
        status: 'success',
        message: 'Đổi mật khẩu thành công',
      },
    };
  },
};

export default authService;
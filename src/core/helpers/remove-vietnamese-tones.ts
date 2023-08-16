const removeVietnameseTones = (vietString: string) => {
  return vietString
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/Đ/g, 'D');
};

export default removeVietnameseTones;

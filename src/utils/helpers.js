import Client from "@/config/Client";
import Cookies from "js-cookie";

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
// export const fetcher = (url) => fetch(url).then((response) => response.json());
export const fetcher = async (url) => {
  const res = await Client.get(url);
  return res;
};
export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
export function logOut() {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  window.location.href = "/auth/login";
}
export function Schema({
  title,
  descriptions,
  content,
  thumb,
  price,
  sale,
  isPublic,
  isComming,
  type,
}) {
  const err = {};
  if (title === "") {
    Object.assign(err, {
      title: "trường này bắt buộc nhập",
    });
  } else {
    delete err.title;
  }

  if (descriptions === "") {
    Object.assign(err, {
      descriptions: "trường này bắt buộc nhập",
    });
  } else {
    delete err.descriptions;
  }

  if (content === "") {
    Object.assign(err, {
      content: "trường này bắt buộc nhập",
    });
  } else {
    delete err.content;
  }
  if (thumb === "") {
    Object.assign(err, {
      thumb: "trường này bắt buộc nhập",
    });
  } else {
    delete err.thumb;
  }
  if (isNaN(price) || price < 0) {
    Object.assign(err, {
      price: "Bắt buộc phải là số và lớn hơn hoặc bằng 0",
    });
  } else {
    delete err.price;
  }

  if (isNaN(sale) || sale < 0) {
    Object.assign(err, {
      sale: "Bắt buộc phải là số và lớn hơn hoặc bằng 0",
    });
  } else {
    delete err.sale;
  }

  if (typeof isPublic !== "boolean") {
    Object.assign(err, {
      isPublic: "sai định dạng boolean!!!",
    });
  } else {
    delete err.isPublic;
  }
  if (typeof isComming !== "boolean") {
    Object.assign(err, {
      isComming: "sai định dạng boolean!!!",
    });
  } else {
    delete err.isComming;
  }
  if (type === "free" || type === "pro" || type === "offline") {
    delete err.type;
  } else {
    Object.assign(err, {
      type: "không đúng định dạng!!!",
    });
  }
  return err;
}

export function EmailCustom(email) {
  if (!email) {
    return;
  }
  const [user, domain] = email.split("@");

  // Nếu tên người dùng quá ngắn, không làm gì cả
  if (user.length <= 2) {
    return email;
  }

  // Lấy ký tự đầu tiên và ký tự cuối cùng của tên người dùng
  const firstChar = user.charAt(0);
  const lastChar = user.charAt(user.length - 1);

  // Tạo chuỗi bị ẩn bằng cách thêm dấu '*' tương ứng với số ký tự ở giữa
  const obfuscatedMiddle = "*".repeat(user.length - 2);

  // Ghép lại tên người dùng bị ẩn và phần miền để tạo ra email bị ẩn
  return `${firstChar}${obfuscatedMiddle}${lastChar}@${domain}`;
}

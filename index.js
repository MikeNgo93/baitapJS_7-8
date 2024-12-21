const master_arr = [];

const addNum = () => {
  if (document.getElementById("new-num").value == "") return;
  if (!Number.isInteger(document.getElementById("new-num").value * 1)) return;
  const new_num = parseInt(document.getElementById("new-num").value);
  master_arr.push(new_num);

  output_result();
};

const output_result = () => {
  // Hiển thị array hiện tại
  const current_arr = document.getElementById("current-arr");
  current_arr.innerHTML = `${master_arr}`;

  // Câu 1
  const result_1 = document.getElementById("result-1");
  result_1.innerHTML = `${sum_of_positive(master_arr)}`;

  // Câu 2
  const result_2 = document.getElementById("result-2");
  result_2.innerHTML = `${count_of_positive(master_arr)}`;

  // Câu 3
  const result_3 = document.getElementById("result-3");
  result_3.innerHTML = `${min_of_array(master_arr)}`;

  // Câu 4
  const result_4 = document.getElementById("result-4");
  result_4.innerHTML = `${min_positive_arr(master_arr)}`;

  // Câu 5
  const result_5 = document.getElementById("result-5");
  result_5.innerHTML = `${last_even_num(master_arr)}`;

  // Câu 7
  const result_7 = document.getElementById("result-7");
  result_7.innerHTML = `${sort_array(master_arr)}`;

  // Câu 8
  const result_8 = document.getElementById("result-8");
  result_8.innerHTML = `${first_prime(master_arr)}`;
};

// Câu 1. Tổng các số dương trong mảng
const sum_of_positive = (arr) => {
  sum_pos = 0;
  for (num of arr) {
    num > 0 ? (sum_pos += num) : sum_pos;
  }
  return sum_pos;
};

// Câu 2. Đếm có bao nhiêu số dương trong mảng
const count_of_positive = (arr) => {
  count_pos = 0;
  for (num of arr) {
    num > 0 ? (count_pos += 1) : count_pos;
  }
  return count_pos;
};

// Câu 3. Tìm số nhỏ nhất trong mảng
const min_of_array = (arr) => {
  return Math.min(...arr); // Dùng thằng spread operator để tách các phần tử trong mảng ra để Math.min đọc
};

// Câu 4. Tìm số dương nhỏ nhất
const min_positive_arr = (arr) => {
  sub_arr = [];
  arr.forEach((element) => {
    element > 0 ? sub_arr.push(element) : 0;
  });
  return Math.min(...sub_arr);
};

// Câu 5. Tìm số chẵn cuối cùng trong mảng. Nếu mảng không có giá trị chẵn thì trả về -1.
const last_even_num = (arr) => {
  for (let i = arr.length - 1; i > -1; i--) {
    if (arr[i] % 2 == 0) return arr[i];
  }
  return -1;
};

// Câu 6. Đổi chỗ 2 giá trị trong mảng theo vị trí (Cho nhập vào 2 vị trí muốn đổi chỗ giá trị).
// Tạo class swapAction
class swapAction {
  constructor(master_arr, swapstr) {
    // Dùng slice để tạo shallow copy chứ không nó đổi luôn master array, array là reference data type
    this.master_copy = master_arr.slice();
    this.swap_list = this.#parseSwapList(swapstr);

    // Kiểm tra swap list, nếu chỉ toàn chứa các giá trị rỗng thì không tạo tiếp object
    // đây là để xử lý trường hợp input = (",") - chỉ có một dấu phẩy
    // trong trường hợp này mảng sẽ vẫn được tạo, nhưng chỉ toàn giá trị rỗng =>
    // nên khi update mảng ban đầu thì bị lỗi

    if (
      this.swap_list === null ||
      this.swap_list.length < 2 ||
      this.swap_list.some((x) => x === null)
    ) {
      console.log("Nhập bị lỗi rồi nhaaaaaa");
      return; // Thoát không tạo object tiếp
    }

    this.result_arr = this.#swapElements();
  }

  // parseSwap để đổi string thành array, 2 thằng này để private đi cho đúng chuẩn
  #parseSwapList = (swapstr) => {
    let swap_list = swapstr.split(",", 2);
    swap_list.forEach((value, i, swap_list) => {
      let value_int = parseInt(value.trim());
      swap_list[i] = value_int;
    });
    return swap_list;
  };

  // Swap 2 phần tử
  #swapElements = () => {
    let temp_value = 0;
    temp_value = this.master_copy[this.swap_list[0]];
    this.master_copy[this.swap_list[0]] = this.master_copy[this.swap_list[1]];
    this.master_copy[this.swap_list[1]] = temp_value;
    console.log("array câu 6: ", this.master_copy);
    return this.master_copy;
  };
}
// test:
// let s = new swapAction([0, 10, 2, 4, 5], "1,2");
// Xử lý thông tin bài 6
const btn_swap_index = document.getElementById("btn-swap_index");
btn_swap_index.addEventListener("click", () => {
  if (!document.getElementById("swap-list").value) return; //null hoặc empty array thì thoát
  const swapstr = document.getElementById("swap-list").value;
  if (!swapstr.includes(",")) return; // Nếu chuỗi nhận về không có dấu phẩy thì cũng thoát
  swapInstance = new swapAction(master_arr, swapstr);

  // Nếu không tạo được object thì không tiếp tục
  if (!swapInstance.result_arr) return;

  // Xuất kết quả câu 6
  const result_6 = document.getElementById("result-6");
  result_6.innerHTML = `${swapInstance.result_arr}`;

  // Cho hiện nút đổi mảng lên
  document.getElementById("btn-swap_array").style.display = "inline";
});

// Đổi mảng nếu cần
const swap_array = () => {
  if (swapInstance.result_arr != null) {
    for (const [i, value] of swapInstance.result_arr.entries()) {
      // Đây là lí do mình thích sử dụng const [index, value] :3
      // Ở đây không xài master_arr = result_arr.slice() được vì master_arr đang là const
      // slice nó tạo một shallow copy sau đó gán cho master_arr nên không được
      // phải đi đổi từng phần tử bên trong master_arr
      master_arr[i] = value;
    }
  }
  output_result();
  return master_arr;
};

// Câu 7. Sắp xếp mảng theo thứ tự tăng dần.
// Sort kiểu gì?
// array.sort() trong javascript dùng Timsort kết hợp giữa insertion sort và merge sort nên
// tối ưu cho data size nhỏ. https://www.geeksforgeeks.org/timsort/
// Tóm lại là dùng array.sort cho nhanh =))

const sort_array = (master_arr) => {
  let sorted_arr = master_arr.slice();
  return sorted_arr.sort((x, y) => x - y);
};

// Câu 8. Tìm số nguyên tố đầu tiên trong mảng. Nếu mảng không có số nguyên tố thì trả về – 1.
// Số nguyên tố chỉ chia hết cho 1 và chính nó. n % (x, all x != (1,n)) != 0 [n > 1];

// helper function - kiểm tra số nguyên tố
const checkPrime = (n) => {
  //   if (n <= 1) return; đã filter ngay ở bước đưa dữ liệu vào nên dòng này không còn cần thiết
  if (n <= 3) return true;
  if (n % 2 == 0) return false;
  // Check kiểu này không hiệu quả, nếu kỹ thì dùng Miller–Rabin test sẽ hay hơn, https://en.wikipedia.org/wiki/Primality_test
  // Nếu dùng Miller-Rabin test thì sau khi ra kết quả phải kiểm tra xem nó có phải là số giả nguyên tố hay ko
  // Do đã kiểm tra số chẵn (mod 2 == 0) nên bây giờ chỉ cần kiểm tra chia hết cho các số lẻ
  // Cho chạy đến sqrt(n) thôi. Vì nếu (n not prime) => n = a * b,
  // nếu cả a và b đều lớn hơn sqrt(n) thì a * b > sqrt(n) ** 2 == n (sai giả thuyết)
  for (let i = 3; i < Math.sqrt(n); i += 2) {
    if (n % i == 0) return false;
  }
  return true;
};

const first_prime = (master_arr) => {
  let result = -1;
  let check_arr = master_arr.filter((num) => num > 1);
  for (num of check_arr) {
    if (checkPrime(num)) {
      result = num;
      break;
    }
  }
  return result;
};

// Câu 9 - Nhập thêm 1 mảng số thực, tìm xem trong mảng có bao nhiêu số nguyên?
const new_array_output = () => {
  // Xử lý dữ liệu đầu vào
  let str_arr = document.getElementById("new-array").value;
  if (!str_arr) return; // null or empty -> exit
  str_arr = str_arr.trim();

  const new_array = validify_array(str_arr);
  let result_9 = count_int(new_array);
  let result_10 = pos_neg_compare(new_array);

  // Result câu 9
  document.getElementById("result-9").innerHTML = `${result_9}`;

  // Result câu 10
  document.getElementById("result-10").innerHTML = `${result_10}`;
};

// Helper function validify array (biến chuỗi thành array số)
const validify_array = (str_arr) => {
  const new_array = str_arr.split(",");
  new_array.forEach((value, index, new_array) => {
    let trimmed_value = value.trim();
    new_array[index] = parseFloat(trimmed_value);
  });
  return new_array;
};

// Helper function count int
const count_int = (arr) => {
  // Tìm số các số nguyên
  let total_int = 0;
  for (const num of arr) {
    if (Number.isInteger(num)) {
      total_int += 1;
    }
  }
  return total_int;
};

// Câu 10. So sánh số lượng số dương và số lượng số âm xem số nào nhiều hơn.
const pos_neg_compare = (arr) => {
  let str = "Số số âm bằng số số dương";
  const positive_arr = arr.filter((x) => x > 0);
  const negative_arr = arr.filter((x) => x < 0);
  positive_arr.length > negative_arr.length
    ? (str = "Số dương nhiều hơn số âm")
    : (str = "Số âm nhiều hơn số dương");
  return str;
};

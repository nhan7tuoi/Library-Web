import { Button, Image } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { _createView } from "../../book/api";

const ListBooks = ({ title, data }) => {
  const navigate = useNavigate();
  const handleContinuteRead = async (book,page) => {
    try {
      const response = await _createView(book._id);
      localStorage.setItem("book", JSON.stringify(book));
      navigate("/book-content", {
        state: { book: book, page: page },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white rounded-md p-3 shadow-md space-y-3 h-1/2">
      <p className="font-bold text-2xl">{title}</p>
      <div className="flex whitespace-nowrap overflow-auto space-x-3 h-full">
        {data?.map((d, index) => (
          <div key={`${d._id}_${index}`} className="h-full p-2 w-1/6 border">
            <Link
              to={"/book"}
              state={{ history: d, book: d.book._id }}
              className="h-full p-2 hover:text-black hover:bg-gray-200 rounded-md  flex items-center"
            >
              <div>
                <Image
                  src={d.book.image}
                  className=""
                  style={{ width: 200, height: 300, objectFit: "cover" }}
                />
                <div className="flex flex-col">
                  <div className="w-40">
                    <p className="font-bold text-lg text-blue-600 overflow-hidden whitespace-nowrap text-ellipsis w-full">
                      {d.book.title}
                    </p>
                    <p className=" overflow-hidden whitespace-nowrap text-ellipsis w-full">
                      {d.book.author}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <Button
              onClick={() => handleContinuteRead(d.book,d.page)}
              className="hover:text-blue-700 z-20"
            >
              Đọc tiếp
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBooks;

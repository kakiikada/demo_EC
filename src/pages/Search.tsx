import { useState } from 'react';
import home_catch from "../assets/common/home_catch.jpg";

function Search() {
  return (
      <div className="search">
        <div className="wrapper">
          <div className="search_header">
            <div className="title">
              <h1 className="title_text">Search Results</h1>
            </div>
          </div>
        </div>
        {/* <div className="wrapper">
          <div className="search_listHeader">
          <p>該当する商品が見つかりませんでした</p>
          </div>
        </div> */}
        <div className="wrapper">
          <div className="search_listHeader">
            <p>「cushion」の検索結果：12件</p>
            <div>
              並び替え：
              <div className="selectBox">
                <select name="" id="">
                  <option value="">新しい順</option>
                  <option value="">古い順</option>
                  <option value="">価格の高い順</option>
                  <option value="">価格の低い順</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="search_listBox">
          <ul className="basicList">
            <li className="basicList_list">
              <a href="">
                <div className="wrapper">
                  <div className="itemLine">
                    <div className="itemLine_img"><img src={home_catch} alt="" /></div>
                    <ul className="itemLine_text">
                      <li className="itemLine_text_title">商品名</li>
                      <li className="itemLine_text_text">商品説明テキストテキストテキスト</li>
                      <li className="itemLine_text_price">￥2,500</li>
                    </ul>
                  </div>
                </div>
              </a>
            </li>
            <li className="basicList_list">
              <a href="">
                <div className="wrapper">
                  <div className="itemLine">
                    <div className="itemLine_img"><img src={home_catch} alt="" /></div>
                    <ul className="itemLine_text">
                      <li className="itemLine_text_title">商品名</li>
                      <li className="itemLine_text_text">商品説明テキストテキストテキスト</li>
                      <li className="itemLine_text_price">￥2,500</li>
                    </ul>
                  </div>
                </div>
              </a>
            </li>
            <li className="basicList_list">
              <a href="">
                <div className="wrapper">
                  <div className="itemLine">
                    <div className="itemLine_img"><img src={home_catch} alt="" /></div>
                    <ul className="itemLine_text">
                      <li className="itemLine_text_title">商品名</li>
                      <li className="itemLine_text_text">商品説明テキストテキストテキスト</li>
                      <li className="itemLine_text_price">￥2,500</li>
                    </ul>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>

      </div>
  );
}

export default Search;
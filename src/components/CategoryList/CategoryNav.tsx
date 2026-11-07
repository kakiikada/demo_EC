import "./CategoryNav.css";
import categories from '../../data/categories';

export default function CategoryNav() {
  return (
      <section>
        <div className="categoryNav">
          <ul className="categoryNav_list">
            <li>
              <div className="categoryNav_list_title">
                <div className="categoryNav_list_title_text">
                  <p>CATEGORY</p>
                </div>
              </div>
            </li>

          {categories.map((category) => (
            <li key={category.id}>
              <a href={`/category/${category.id}`}>
                <div className={`categoryCard ${category.id}`}>
                  <div className="categoryCard_img">
                    <img src={category.image} alt="" />
                  </div>
                  <div className="categoryCard_text">
                    <p><span>{category.name}</span><span>{category.label}</span></p>
                  </div>
                </div>
              </a>
            </li>
          ))}
          </ul>
        </div>
      </section>
  )
}
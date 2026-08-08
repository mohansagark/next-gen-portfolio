import makePath from "./makePath";
import makeText from "./makeText";

const filterItems = (items, collection, filterItem, isProducts) => {
  switch (collection) {
    case "category":
      return items?.filter(
        ({ type, category }) =>
          makePath(isProducts ? type : category) === filterItem
      );

    case "brand":
      return items?.filter(({ brand }) => makePath(brand) === filterItem);

    case "tags":
      return items?.filter(({ tags }) => {
        const filterableTags = tags?.map((tag) => tag.toLowerCase());

        return filterableTags?.includes(makeText(filterItem));
      });

    case "size":
      return items?.filter(({ size }) => makePath(size) === filterItem);

    case "color":
      return items?.filter(({ color }) => makePath(color) === filterItem);

    case "author":
      return items?.filter(
        ({ author }) => makePath(author?.name) === filterItem
      );

    case "role":
      return items?.filter(
        ({ author_role }) =>
          makePath(author_role ? author_role : "") === filterItem
      );

    case "search":
      if (!filterItem) return [];
      // Escape regex metacharacters — live search feeds partial input (e.g. a
      // lone "(" or "+") straight in, and an unescaped one would throw.
      const escaped = makeText(filterItem).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const searchText = new RegExp(escaped, "i");
      const stripHtml = (html) =>
        (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
      return items?.filter((item) => {
        const {
          title,
          category,
          desc,
          summary,
          subtitle,
          tags,
          html,
          content,
        } = item || {};
        const tagText = Array.isArray(tags) ? tags.join(" ") : tags || "";
        const haystack = [
          title,
          category,
          desc,
          summary,
          subtitle,
          tagText,
          stripHtml(html),
          typeof content === "string" ? content : "",
        ].join(" ");
        return searchText.test(haystack);
      });

    case "popularity":
      return [...items]?.sort((a, b) => b.views - a.views);

    case "new":
      return [...items]?.sort((a, b) => b.date - a.date);

    default:
      return items;
  }
};

export default filterItems;

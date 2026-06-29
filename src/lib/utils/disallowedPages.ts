
const disallowedPages = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.PUBLIC_API_URL || "https://localhost:3000"}/api/pages?depth=1&draft=false&trash=false&where[isHidden][equals]=true`,
    );

    const pages = await res?.json();

    const slugs = pages.docs.map((page: any) => `${page.slug}`)

    return slugs;

  } catch (error: any) {
    console.log("An error occurred fetching disallowed pages: ", error.message);
  }
};

export default disallowedPages;

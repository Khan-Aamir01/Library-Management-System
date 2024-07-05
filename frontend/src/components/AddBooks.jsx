export const AddBooks = () => {
  //Name, Author_Name, categories, isPhysical, isEbook, Downloads, Availability, ImageUrl, DownloadUrl, Date
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Submission Success");
  };
  return (
    <div>
      <h1>Add Book</h1>
      <form action="" method="POST" onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" name="Name" id="name" placeholder="Book Name" />

        <label htmlFor="author_name">Author_Name: </label>
        <input
          type="text"
          name="Author_Name"
          id="author_name"
          placeholder="Author_Name"
        />

        <label htmlFor="categories">Categories: </label>
        <input
          type="text"
          name="Categories"
          id="categories"
          placeholder="Categories"
        />

        <label htmlFor="isPhysical"> P-Book Available: </label>
        <input
          type="text"
          name="isPhysical"
          id="isPhysical"
          placeholder="Enter True or False"
        />

        <label htmlFor="isEbook">E-Book Available: </label>
        <input
          type="text"
          name="isEbook"
          id="isEbook"
          placeholder="Enter True or False"
        />

        <label htmlFor="availability">Book Qty: </label>
        <input
          type="number"
          name="Availability"
          id="availability"
          placeholder="Total books"
        />

        <label htmlFor="imageUrl">Book Image: </label>
        <input
          type="text"
          name="ImageUrl"
          id="imageUrl"
          placeholder="Enter Image Link"
        />
        <label htmlFor="downloadUrl">Book PDF: </label>
        <input
          type="text"
          name="DownloadUrl"
          id="downloadUrl"
          placeholder="Enter Pdf Link"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

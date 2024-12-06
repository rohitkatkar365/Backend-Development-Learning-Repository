class ApiFeature {
    constructor(query, querystr) {
      this.query = query;
      this.querystr = querystr;
    }
  
    // Method to filter based on comparison operators
    filter() {
      // Convert query string to JSON
      let queryString = JSON.stringify(this.querystr);
      
      // Replace comparison operators with MongoDB operators
      queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
      
      // Parse back to object
      const filter = JSON.parse(queryString);
    
      // Log filter application
      if (Object.keys(filter).length === 0) {
        console.warn("No valid filter parameters provided.");
      } else {
        console.log("Filter applied:", filter); // Debug log
      }
    
      // Apply filter to query
      this.query = this.query.find(filter);
      return this;
    }
    
    
  
    // Method to sort by a specified field, defaulting to 'title'
    sort() {
        const sortBy = this.querystr.sort ? this.querystr.sort.split(',').join(' ') : 'title';
        console.log("Sort applied:", sortBy); // Debug log
        this.query = this.query.sort(sortBy);
        return this;
      }
      
  
    // Method to limit fields in the response
    limitField() {
      if (this.querystr.fields) {
        const fields = this.querystr.fields.split(',').join(' ');
        console.log("Fields selected:", fields); // Debug log
        this.query = this.query.select(fields);
      }
      return this;
    }
  
    // Method to paginate results based on 'limit' and 'page' parameters
    pagination() {
        const limit = parseInt(this.querystr.limit) || 20;
        const page = parseInt(this.querystr.page) || 1;
        const skip = (page - 1) * limit;
      
        console.log(`Pagination applied: limit = ${limit}, page = ${page}, skip = ${skip}`);
        
        this.query = this.query.skip(skip).limit(limit);
        return this;
      }
      
  }
  
  module.exports = ApiFeature;
  
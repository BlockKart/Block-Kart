import React from "react";

const SaleStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Sale statistics</h5>
          <iframe
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
              width: "100%",
              height: "350px",
            }}
            src="https://charts.mongodb.com/charts-movie-space-kwozu/embed/charts?id=62e4cb7f-e603-48ed-81d8-a4ef3c54b055&maxDataAge=3600&theme=light&autoRefresh=true"
          ></iframe>
          {/* <iframe style="background: #F1F5F4;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"  src="https://charts.mongodb.com/charts-movie-space-kwozu/embed/dashboards?id=62e4c6fa-0e3b-4c53-89a1-f96fef25f83d&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"></iframe> */}
        </article>
      </div>
    </div>
  );
};

export default SaleStatistics;

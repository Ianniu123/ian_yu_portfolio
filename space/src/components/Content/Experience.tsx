"use client";

import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { FaBriefcase, FaGraduationCap, FaStar } from "react-icons/fa";

const itemStyles = {
  content: {
    background: "rgba(0, 40, 60, 0.65)",
    color: "#ffffff",
    border: "1px solid rgba(0, 255, 255, 0.35)",
    boxShadow: "0 0 12px rgba(0, 255, 255, 0.2)",
  },
  arrow: {
    borderRight: "7px solid rgba(0, 255, 255, 0.35)",
  },
  icon: {
    background: "rgb(0, 60, 80)",
    color: "#00ffff",
    boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
  },
};

const Experience = () => {
  return (
    <>
      <div className="panel-content">
        <div style={{ width: "100%" }}>
          <VerticalTimeline lineColor="#00ffff" layout="2-columns">
            <VerticalTimelineElement
              className=""
              date="2025 — Present"
              contentStyle={itemStyles.content}
              contentArrowStyle={itemStyles.arrow}
              iconStyle={itemStyles.icon}
              icon={<FaBriefcase />}
            >
              <h3 className="text-xl font-semibold tracking-wide">Technical Systems Analyst</h3>
              <h4 className="text-sm opacity-80">Royal Bank of Canada</h4>
              <p className="text-sm ">Building A.I. document analyzer and Flask microservice.</p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2024"
              contentStyle={itemStyles.content}
              contentArrowStyle={itemStyles.arrow}
              iconStyle={itemStyles.icon}
              icon={<FaBriefcase />}
            >
              <h3 className="text-xl font-semibold tracking-wide">Data Analyst Intern </h3>
              <h4 className="text-sm opacity-80">Shared Services Canada</h4>
              <p className="text-sm">Engineered an ETL pipeline for processing unstructured documents into structured, queryable data for retrieval-augmented generation.</p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              date="2022 — Expected 2027"
              contentStyle={itemStyles.content}
              contentArrowStyle={itemStyles.arrow}
              iconStyle={itemStyles.icon}
              icon={<FaGraduationCap />}
            >
              <h3 className="text-xl font-semibold tracking-wide">B.Sc. Computer Science</h3>
              <h4 className="text-sm opacity-80">Carleton University</h4>
              <p className="text-sm">Computer Science Major. Mathematics Minor. Artificial Intelligence/Machine Learning stream.</p>
            </VerticalTimelineElement>

            <VerticalTimelineElement iconStyle={itemStyles.icon} icon={<FaStar />} />
          </VerticalTimeline>
        </div>
      </div>
    </>
  );
};

export default Experience;
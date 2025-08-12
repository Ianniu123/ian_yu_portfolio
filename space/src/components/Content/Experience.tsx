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
              className="vertical-timeline-element--work"
              date="2024 — Present"
              contentStyle={itemStyles.content}
              contentArrowStyle={itemStyles.arrow}
              iconStyle={itemStyles.icon}
              icon={<FaBriefcase />}
            >
              <h3 className="vertical-timeline-element-title">Software Engineer</h3>
              <h4 className="vertical-timeline-element-subtitle">Company / Team</h4>
              <p className="description">Building interactive systems and intelligent features.</p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2023 — 2024"
              contentStyle={itemStyles.content}
              contentArrowStyle={itemStyles.arrow}
              iconStyle={itemStyles.icon}
              icon={<FaBriefcase />}
            >
              <h3 className="vertical-timeline-element-title">Undergraduate Research Assistant</h3>
              <h4 className="vertical-timeline-element-subtitle">Lab / University</h4>
              <p className="description">Prototyped models and tools; wrote and evaluated experiments.</p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              date="2021 — 2025"
              contentStyle={itemStyles.content}
              contentArrowStyle={itemStyles.arrow}
              iconStyle={itemStyles.icon}
              icon={<FaGraduationCap />}
            >
              <h3 className="vertical-timeline-element-title">B.Sc. Computer Science</h3>
              <h4 className="vertical-timeline-element-subtitle">Carleton University</h4>
              <p className="description">CS + Math coursework, projects, and extracurriculars.</p>
            </VerticalTimelineElement>

            <VerticalTimelineElement iconStyle={itemStyles.icon} icon={<FaStar />} />
          </VerticalTimeline>
        </div>
      </div>
    </>
  );
};

export default Experience;
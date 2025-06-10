import Skill from "./Skill.model";

const skills = await Skill.findAll();
console.log(JSON.stringify(skills, null, 2));

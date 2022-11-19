function replaceRegion(self, text, regionId = null) {
  text = text.replace(
    /<region>/g,
    self.$t("replace.region." + (regionId || "default"))
  );

  text = text.replace(
    /<regionParental>/g,
    self.$t("replace.regionParental." + (regionId || "default"))
  );

  text = text.replace(
    /<regionLocal>/g,
    self.$t("replace.regionLocal." + (regionId || "default"))
  );

  return text;
}

function clearHTMLTags(text) {
  if (!text) return;
  text = text.replace(/<p>/g, "");
  text = text.replace(/<\/p>/g, "");

  return text;
}

export function getRegionLocalText(regionId = null) {
  return this.$i18n.t("replace.regionLocal." + (regionId || "default"));
}

export function getDescription(item, isProper = false, regionId = null) {
  let lang = this.$i18n.locale;
  if (isProper) return item["description_" + lang] || item.description_ru;
  if (lang == "ru") {
    let text = item.description;
    if (text) text = replaceRegion(this, text, regionId);
    if (text) text = clearHTMLTags(text);

    return text;
  }

  let text = item["description_" + lang] || item.description;
  if (text) text = replaceRegion(this, text, regionId);
  if (text) text = clearHTMLTags(text);

  return text;
}

export function getText(item, isProper = false) {
  if (!item) return "";
  let lang = this.$i18n.locale;
  if (isProper) return item["text_" + lang] || item.text_ru;
  if (lang == "ru") return item.text;
  return item["text_" + lang] || item.text;
}

export function getAddress(item) {
  let lang = this.$i18n.locale;
  if (lang == "ru") return item.address;
  return item["address_" + lang] || item.address;
}

export function getPoint(item) {
  let lang = this.$i18n.locale;
  if (lang == "ru") return item.point;
  return item["point_" + lang] || item.point;
}

export function getWorkTime(item) {
  if (item.is_all_day == 1) return this.$t("allday");
  let sTime = this.$moment(`${item.start_time}`, "H:m:s").format("HH:mm");
  let eTime = this.$moment(`${item.end_time}`, "H:m:s").format("HH:mm");
  return `${sTime} - ${eTime}`;
}
export function getWorkDays(item) {
  return this.$t("workin_days" + (item.is_all_day || 0));
}

export function getReception(item) {
  let lang = this.$i18n.locale;
  if (lang == "ru") return item.reception_days;
  return item["reception_days_" + lang] || item.reception_days;
}

export function getBiography(item) {
  let lang = this.$i18n.locale;
  if (lang == "ru") return item.biography;
  return item["biography_" + lang] || item.biography;
}
export function getDepartment(item) {
  let lang = this.$i18n.locale;
  return item["department_" + lang] || item.department_ru;
}
export function getRegionName(regionId, storeRegions, isWithParent = false) {
  if (!regionId) return "";
  let lang = this.$i18n.locale;

  let region = storeRegions.find((x) => x.id == regionId);
  if (!region) return "";

  if (isWithParent) {
    let parent = storeRegions.find((x) => x.id == region.parent_id);
    if (parent) {
      if (lang == "ru") return `${parent.name || ""} - ${region.name}`;
      return `${parent["name_" + lang] || parent.name} - ${
        region["name_" + lang] || region.name
      }`;
    }
  }

  if (lang == "ru") return region.name;
  return region["name_" + lang] || region.name;
}
export function getRegionNameBySlug(
  regionSlug,
  storeRegions,
  isWithParent = false
) {
  if (!regionSlug) return "";
  let lang = this.$i18n.locale;

  let region = storeRegions.find((x) => x.url == regionSlug);
  if (!region) return "";

  if (isWithParent) {
    let parent = storeRegions.find((x) => x.id == region.parent_id);
    if (parent) {
      if (lang == "ru") return `${parent.name || ""} - ${region.name}`;
      return `${parent["name_" + lang] || parent.name} - ${
        region["name_" + lang] || region.name
      }`;
    }
  }

  if (lang == "ru") return region.name;
  return region["name_" + lang] || region.name;
}
export function getRegionIdBySlug(regionSlug, storeRegions) {
  if (!regionSlug) return null;

  let region = storeRegions.find((x) => x.url == regionSlug);
  if (!region) return null;

  return region.id;
}

export const getPhoneNumbers = (phone) => {
  if (!phone) return [];
  let arr = phone.split(" ");
  arr = arr.filter((x) => !!x.trim());
  return arr;
};

export const convertToPrice = (number) =>
  (number + "").split(/(?!^)(?=(?:\d{3})+(?:\.|$))/).join(" ");

export const getPrice = (item) => {
  if (!!item.price_range) return item.price_range;
  return convertToPrice(item.price);
};

export const getLocationURL = (lat, lon) => {
  if (!lat || !lon) return "";
  return `https://yandex.ru/maps/?pt=${lon},${lat}&z=18&l=map`;
};

export const getRating = (item) => {
  if (!item.rating) return 0;
  return parseFloat(item.rating).toFixed(2);
};

export function formatedDate(item) {
  return this.$moment(item.date).format("DD.MM.YYYY HH:mm");
}

export function getRegionIds(regionSlug, storeRegions, nestedRegions) {
  if (!regionSlug) return [];
  let regionIds = [];
  let region = storeRegions.find((x) => x.url == regionSlug);
  if (!region) return [];
  if (region.parent_id == null) {
    let pRegion = nestedRegions.find((x) => x.id == region.id);
    if (!pRegion) regionIds.push(region.id);
    else {
      regionIds = pRegion.children.map((x) => x.id);
      regionIds.push(region.id);
    }
  } else {
    regionIds.push(region.id);
  }

  return regionIds;
}

export function normalizeRating(rating) {
  if (!rating) return 0;
  return (parseFloat(rating) / 2).toFixed(1);
}

export function getHasChildItems(arr) {
  return arr.filter((x) => !!x.children.length);
}

export function getHasNotChildItems(arr) {
  return arr.filter((x) => !x.children.length);
}

export function getMediaUrl(folder, name) {
  return this.$config.media_url + folder + "/" + name;
}

export function isUserRegistered() {
  return this.$store.getters["isUserRegistered"];
}

export function getUserData() {
  return this.$store.getters["getUserData"];
}

export function getUserInitials(name) {
  // if (!name) return "?";
  // let matched = name.split(" ");
  // let arr = matched.map((x) => x.slice(0, 1));
  // if (arr.length > 3) arr = arr.slice(0, 3);
  // return arr.join("");
}

export function setTrack(options) {
  // ACTIONS LIST:
  // SHOW - просмотр
  // LOCATION - просмотр локации
  // REVIEW - просмотр отзыва
  // FEEDBACK - оставление отзыва
  // RATE - оставление оценки
  // CONTACT - просмотр контакта

  // SELECTORS LIST:
  // DOCTOR => doctor, direction
  // UNIT DOCTOR => doctor, clinic
  // UNIT CLINIC => clinic
  // SERVICE => service, clinic
  // ANALYZE => analyze, clinic
  // PHARMACY => pharmacy
  // ACTION => action_id

  if (!this.$store.getters["isUserRegistered"]) return;

  let userData = this.$store.getters["getUserData"];

  let qData = {
    id: userData.id || null,
    clinic: options.clinic || null,
    service: options.service || null,
    analyze: options.analyze || null,
    direction: options.direction || null,
    doctor: options.doctor || null,
    action_id: options.action_id || null,
    pharmacy: options.pharmacy || null,
    action: options.action || null,
    selector: options.selector || null,
  };

  return this.$axios
    .post("api/set-track", qData)
    .catch(console.log);
}

export function getSeoTitle(item, regionId = null) {
  let lang = this.$i18n.locale;
  let text = item["seo_title_" + lang] || item.seo_title_ru;

  if (!text) return text;

  text = replaceRegion(this, text, regionId);
  return text;
}

export function getSeoDescription(item, regionId = null) {
  let lang = this.$i18n.locale;
  let text = item["seo_description_" + lang] || item.seo_description_ru;

  if (!text) return text;

  text = replaceRegion(this, text, regionId);
  return text;
}

export function getSeoKeywords(item) {
  let lang = this.$i18n.locale;
  return item["seo_keywords_" + lang] || item.seo_keywords_ru;
}

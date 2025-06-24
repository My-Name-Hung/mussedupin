import React, { useEffect, useMemo, useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  getAnPhamImageUrl,
  getHoiThaoNgheThuatImageUrl,
  getInTheoYeuCauImageUrl,
  getKhuyenTaiImageUrl,
  getSanPhamTuThongImageUrl,
  getThoCamImageUrl,
  getThoiTrangImageUrl,
} from "../../utils/cloudinary";
import "./CategoryDetail.css";

export const sampleProducts = {
  khuyentai: [
    {
      id: "khuyentai-1",
      title: "Khuyên tai 1",
      price: "Liên hệ",
      images: [
        "khuyentai-hero (1).webp",
        "khuyentai-hero (2).webp",
        "khuyentai-hero (11).webp",
        "khuyentai-hero (12).webp",
        "khuyentai-hero (41).webp",
      ],
      image: "khuyentai-hero (1).webp", // Thumbnail
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-2",
      title: "Khuyên tai 2",
      price: "Liên hệ",
      images: ["khuyentai-hero (3).webp"],
      image: "khuyentai-hero (3).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-3",
      title: "Khuyên tai 3",
      price: "Liên hệ",
      images: [
        "khuyentai-hero (4).webp",
        "khuyentai-hero (5).webp",
        "khuyentai-hero (13).webp",
        "khuyentai-hero (14).webp",
      ],
      image: "khuyentai-hero (4).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-4",
      title: "Khuyên tai 4",
      price: "Liên hệ",
      images: ["khuyentai-hero (6).webp", "khuyentai-hero (40).webp"],
      image: "khuyentai-hero (6).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-5",
      title: "Khuyên tai 5",
      price: "Liên hệ",
      images: [
        "khuyentai-hero (7).webp",
        "khuyentai-hero (38).webp",
        "khuyentai-hero (39).webp",
      ],
      image: "khuyentai-hero (7).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-6",
      title: "Khuyên tai 6",
      price: "Liên hệ",
      images: ["khuyentai-hero (8).webp", "khuyentai-hero (9).webp"],
      image: "khuyentai-hero (8).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-7",
      title: "Khuyên tai 7",
      price: "Liên hệ",
      images: ["khuyentai-hero (10).webp"],
      image: "khuyentai-hero (10).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-8",
      title: "Khuyên tai 8",
      price: "Liên hệ",
      images: [
        "khuyentai-hero (15).webp",
        "khuyentai-hero (16).webp",
        "khuyentai-hero (17).webp",
        "khuyentai-hero (18).webp",
        "khuyentai-hero (19).webp",
      ],
      image: "khuyentai-hero (15).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-9",
      title: "Khuyên tai 9",
      price: "Liên hệ",
      images: ["khuyentai-hero (20).webp", "khuyentai-hero (21).webp"],
      image: "khuyentai-hero (20).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-10",
      title: "Khuyên tai 10",
      price: "Liên hệ",
      images: ["khuyentai-hero (22).webp"],
      image: "khuyentai-hero (22).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-11",
      title: "Khuyên tai 11",
      price: "Liên hệ",
      images: ["khuyentai-hero (23).webp", "khuyentai-hero (24).webp"],
      image: "khuyentai-hero (23).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-12",
      title: "Khuyên tai 12",
      price: "Liên hệ",
      images: [
        "khuyentai-hero (25).webp",
        "khuyentai-hero (26).webp",
        "khuyentai-hero (27).webp",
      ],
      image: "khuyentai-hero (25).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-13",
      title: "Khuyên tai 13",
      price: "Liên hệ",
      images: ["khuyentai-hero (28).webp", "khuyentai-hero (29).webp"],
      image: "khuyentai-hero (28).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-14",
      title: "Khuyên tai 14",
      price: "Liên hệ",
      images: ["khuyentai-hero (30).webp"],
      image: "khuyentai-hero (30).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-15",
      title: "Khuyên tai 15",
      price: "Liên hệ",
      images: [
        "khuyentai-hero (31).webp",
        "khuyentai-hero (32).webp",
        "khuyentai-hero (34).webp",
        "khuyentai-hero (35).webp",
      ],
      image: "khuyentai-hero (31).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-16",
      title: "Khuyên tai 16",
      price: "Liên hệ",
      images: ["khuyentai-hero (36).webp"],
      image: "khuyentai-hero (36).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-17",
      title: "Khuyên tai 17",
      price: "Liên hệ",
      images: ["khuyentai-hero (37).webp"],
      image: "khuyentai-hero (37).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-18",
      title: "Khuyên tai 18",
      price: "Liên hệ",
      images: ["khuyentai-hero (43).webp"],
      image: "khuyentai-hero (43).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-19",
      title: "Khuyên tai 19",
      price: "Liên hệ",
      images: ["khuyentai-hero (44).webp"],
      image: "khuyentai-hero (44).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-20",
      title: "Khuyên tai 20",
      price: "Liên hệ",
      images: ["khuyentai-hero (45).webp"],
      image: "khuyentai-hero (45).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-21",
      title: "Khuyên tai 21",
      price: "Liên hệ",
      images: ["khuyentai-hero (46).webp"],
      image: "khuyentai-hero (46).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-22",
      title: "Khuyên tai 22",
      price: "Liên hệ",
      images: ["khuyentai-hero (47).webp"],
      image: "khuyentai-hero (47).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-23",
      title: "Khuyên tai 23",
      price: "Liên hệ",
      images: ["khuyentai-hero (48).webp"],
      image: "khuyentai-hero (48).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-24",
      title: "Khuyên tai 24",
      price: "Liên hệ",
      images: ["khuyentai-hero (49).webp"],
      image: "khuyentai-hero (49).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-25",
      title: "Khuyên tai 25",
      price: "Liên hệ",
      images: ["khuyentai-hero (50).webp"],
      image: "khuyentai-hero (50).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-26",
      title: "Khuyên tai 26",
      price: "Liên hệ",
      images: ["khuyentai-hero (42).webp"],
      image: "khuyentai-hero (42).webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-27",
      title: "Khuyên tai 27",
      price: "Liên hệ",
      images: ["MDP Model 21.webp", "MDP Model 22.webp"],
      image: "MDP Model 21.webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-28",
      title: "Khuyên tai 28",
      price: "Liên hệ",
      images: ["MDP Model 23.webp", "MDP Model 24.webp"],
      image: "MDP Model 23.webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-29",
      title: "Khuyên tai 29",
      price: "Liên hệ",
      images: ["MDP Model 210.webp"],
      image: "MDP Model 210.webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-30",
      title: "Khuyên tai 30",
      price: "Liên hệ",
      images: ["MDP Model 217.webp"],
      image: "MDP Model 217.webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-31",
      title: "Khuyên tai 31",
      price: "Liên hệ",
      images: ["MDP Model 220.webp"],
      image: "MDP Model 220.webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-32",
      title: "Khuyên tai 32",
      price: "Liên hệ",
      images: ["MDP-3837.webp", "MDP-3842.webp"],
      image: "MDP-3837.webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-33",
      title: "Khuyên tai 33",
      price: "Liên hệ",
      images: ["MDP-3805.webp"],
      image: "MDP-3805.webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-34",
      title: "Khuyên tai 34",
      price: "Liên hệ",
      images: ["MDP-3812.webp"],
      image: "MDP-3812.webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-35",
      title: "Khuyên tai 35",
      price: "Liên hệ",
      images: ["MDP-3817.webp"],
      image: "MDP-3817.webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-36",
      title: "Khuyên tai 36",
      price: "Liên hệ",
      images: ["MDP-3823.webp"],
      image: "MDP-3823.webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-37",
      title: "Khuyên tai 37",
      price: "Liên hệ",
      images: ["MDP-3830.webp"],
      image: "MDP-3830.webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-38",
      title: "Khuyên tai 38",
      price: "Liên hệ",
      images: ["MDP-3846.webp"],
      image: "MDP-3846.webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-39",
      title: "Khuyên tai 39",
      price: "Liên hệ",
      images: ["MDP-3875.webp"],
      image: "MDP-3875.webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-40",
      title: "Khuyên tai 40",
      price: "Liên hệ",
      images: ["MDP-3877.webp"],
      image: "MDP-3877.webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-41",
      title: "Khuyên tai 41",
      price: "Liên hệ",
      images: ["MDP-3886.webp"],
      image: "MDP-3886.webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-42",
      title: "Khuyên tai 42",
      price: "Liên hệ",
      images: ["MDP-3891.webp"],
      image: "MDP-3891.webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
    {
      id: "khuyentai-43",
      title: "Khuyên tai 43",
      price: "Liên hệ",
      images: [
        "MDP-1140241.webp",
        "MDP-1140315.webp",
        "MDP-1140349.webp",
        "MDP-1140364.webp",
      ],
      image: "MDP-1140241.webp", // Thumbnail
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Khuyên tai",
      category: "khuyentai",
    },
  ],
  anpham: [
    {
      id: "anpham-1",
      title: "Tuổi thơ",
      price: "Liên hệ",
      images: ["tuoitho.png"],
      image: "tuoitho.png",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tuổi thơ",
      category: "anpham",
    },
    {
      id: "anpham-2",
      title: "Dâu tây",
      price: "Liên hệ",
      images: ["dautay.png"],
      image: "dautay.png",
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Dâu tây",
      category: "anpham",
    },
    {
      id: "anpham-3",
      title: "Hoa ban trắng",
      price: "Liên hệ",
      images: ["hoabantrang.png"],
      image: "hoabantrang.png",
      isNew: true,
      isTrending: false,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Hoa ban trắng",
      category: "anpham",
    },
  ],
  "in-theo-yeu-cau": [
    {
      id: "tranh-1",
      title: "tranh 1",
      price: "Liên hệ",
      images: ["BTT01209-HDR.webp"],
      image: "BTT01209-HDR.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "In tranh nghệ thuật",
      category: "in-theo-yeu-cau",
    },
    {
      id: "tranh-2",
      title: "tranh 2",
      price: "Liên hệ",
      images: ["BTT01405-HDR.webp"],
      image: "BTT01405-HDR.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "In tranh nghệ thuật",
      category: "in-theo-yeu-cau",
    },
    {
      id: "tranh-3",
      title: "tranh 3",
      price: "Liên hệ",
      images: ["BTT01421-HDR.webp"],
      image: "BTT01421-HDR.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "In tranh nghệ thuật",
      category: "in-theo-yeu-cau",
    },
    {
      id: "tranh-4",
      title: "tranh 4",
      price: "Liên hệ",
      images: ["BTT01438-HDR.webp"],
      image: "BTT01438-HDR.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "In tranh nghệ thuật",
      category: "in-theo-yeu-cau",
    },
    {
      id: "tranh-5",
      title: "tranh 5",
      price: "Liên hệ",
      images: ["BTT01451-HDR.webp"],
      image: "BTT01451-HDR.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "In tranh nghệ thuật",
      category: "in-theo-yeu-cau",
    },
    {
      id: "tranh-6",
      title: "tranh 6",
      price: "Liên hệ",
      images: ["BTT01498-HDR.webp"],
      image: "BTT01498-HDR.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "In tranh nghệ thuật",
      category: "in-theo-yeu-cau",
    },
    {
      id: "tranh-7",
      title: "tranh 7",
      price: "Liên hệ",
      images: ["BTT01513-HDR.webp"],
      image: "BTT01513-HDR.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "In tranh nghệ thuật",
      category: "in-theo-yeu-cau",
    },
    {
      id: "tranh-8",
      title: "tranh 8",
      price: "Liên hệ",
      images: ["BTT01517-HDR.webp"],
      image: "BTT01517-HDR.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "In tranh nghệ thuật",
      category: "in-theo-yeu-cau",
    },
    {
      id: "tranh-9",
      title: "tranh 9",
      price: "Liên hệ",
      images: ["BTT01529-HDR.webp"],
      image: "BTT01529-HDR.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "In tranh nghệ thuật",
      category: "in-theo-yeu-cau",
    },
  ],
  "hoi-thao-nghe-thuat": [
    {
      id: "hoithaonghethuat-1",
      title: "Tay nặn tay vẽ",
      price: "Liên hệ",
      images: ["hoithaonghethuat.jpg"],
      image: "hoithaonghethuat.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tay nặn tay vẽ",
      category: "hoi-thao-nghe-thuat",
    },
  ],
  "thoi-trang-va-phu-kien": [
    {
      id: "thoitrang-1",
      title: "Áo phông nam",
      price: "Liên hệ",
      images: ["aophong.png"],
      image: "aophong.png",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Áo phông nam",
      category: "thoi-trang-va-phu-kien",
    },
  ],
  thocam: [
    {
      id: "thocam-1",
      title: "Cravat 01",
      price: "600.000đ",
      images: ["Cravat 01.webp"],
      image: "Cravat 01.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Cravat",
      category: "thocam",
    },
    {
      id: "thocam-2",
      title: "Cravat 02",
      price: "600.000đ",
      images: ["Cravat 02.webp"],
      image: "Cravat 02.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Cravat",
      category: "thocam",
    },
    {
      id: "thocam-3",
      title: "Cravat 03",
      price: "600.000đ",
      images: ["Cravat 03.webp"],
      image: "Cravat 03.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Cravat",
      category: "thocam",
    },
    {
      id: "thocam-4",
      title: "Cravat 04",
      price: "600.000đ",
      images: ["Cravat 04.webp"],
      image: "Cravat 04.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Cravat",
      category: "thocam",
    },
    {
      id: "thocam-5",
      title: "Đầm trẻ em mã 01,02,03",
      price: "Liên hệ",
      images: ["Đầm_trẻ_em_mã_01_02_03.webp"],
      image: "Đầm_trẻ_em_mã_01_02_03.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Đầm trẻ em",
      category: "thocam",
    },
    {
      id: "thocam-6",
      title: "Đầm trẻ em mã 04,05,06",
      price: "Liên hệ",
      images: ["Đầm_trẻ_em_mã_04_05_06.webp"],
      image: "Đầm_trẻ_em_mã_04_05_06.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Đầm trẻ em",
      category: "thocam",
    },
    {
      id: "thocam-7",
      title: "Gối trang trí 1",
      price: "600.000đ",
      images: ["Gôi trang trí 1.webp"],
      image: "Gôi trang trí 1.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Gối trang trí",
      category: "thocam",
    },
    {
      id: "thocam-8",
      title: "Gối trang trí 2",
      price: "600.000đ",
      images: ["Gôi trang trí 2.webp"],
      image: "Gôi trang trí 2.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Gối trang trí",
      category: "thocam",
    },
    {
      id: "thocam-9",
      title: "Hộp bút",
      price: "60.000đ",
      images: ["Hộp bút.webp"],
      image: "Hộp bút.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Hộp bút",
      category: "thocam",
    },
    {
      id: "thocam-10",
      title: "Kẹp tóc 01",
      price: "195.000đ",
      images: ["Kẹp tóc 01.webp"],
      image: "Kẹp tóc 01.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Kẹp tóc",
      category: "thocam",
    },
    {
      id: "thocam-11",
      title: "Kẹp tóc 02",
      price: "195.000đ",
      images: ["Kẹp tóc 02.webp"],
      image: "Kẹp tóc 02.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Kẹp tóc",
      category: "thocam",
    },
    {
      id: "thocam-12",
      title: "Kẹp tóc 03",
      price: "195.000đ",
      images: ["Kẹp tóc 03.webp"],
      image: "Kẹp tóc 03.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Kẹp tóc",
      category: "thocam",
    },
    {
      id: "thocam-13",
      title: "Kẹp tóc 04",
      price: "195.000đ",
      images: ["Kẹp tóc 04.webp"],
      image: "Kẹp tóc 04.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Kẹp tóc",
      category: "thocam",
    },
    {
      id: "thocam-14",
      title: "Kẹp tóc 05",
      price: "195.000đ",
      images: ["Kẹp tóc 05.webp"],
      image: "Kẹp tóc 05.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Kẹp tóc",
      category: "thocam",
    },
    {
      id: "thocam-15",
      title: "Kẹp tóc 06",
      price: "195.000đ",
      images: ["Kẹp tóc 06.webp"],
      image: "Kẹp tóc 06.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Kẹp tóc",
      category: "thocam",
    },
    {
      id: "thocam-16",
      title: "Kẹp tóc 07",
      price: "195.000đ",
      images: ["Kẹp tóc 07.webp"],
      image: "Kẹp tóc 07.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Kẹp tóc",
      category: "thocam",
    },
    {
      id: "thocam-17",
      title: "Kẹp tóc 08",
      price: "195.000đ",
      images: ["Kẹp tóc 08.webp"],
      image: "Kẹp tóc 08.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Kẹp tóc",
      category: "thocam",
    },
    {
      id: "thocam-18",
      title: "Set hộp đồ trang điểm 3 size",
      price: "370.000đ",
      images: ["Set hộp đồ trang điểm 3 size.webp"],
      image: "Set hộp đồ trang điểm 3 size.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Set hộp đồ trang điểm",
      category: "thocam",
    },
    {
      id: "thocam-19",
      title: "Sơ mi nam 01",
      price: "1.450.000đ",
      images: ["Sơ mi nam 01.webp"],
      image: "Sơ mi nam 01.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Sơ mi nam",
      category: "thocam",
    },
    {
      id: "thocam-20",
      title: "Sơ mi nam 02",
      price: "1.450.000đ",
      images: ["Sơ mi nam 02.webp"],
      image: "Sơ mi nam 02.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Sơ mi nam",
      category: "thocam",
    },
    {
      id: "thocam-21",
      title: "Sơ mi nam 03",
      price: "1.450.000đ",
      images: ["Sơ mi nam 03.webp"],
      image: "Sơ mi nam 03.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Sơ mi nam",
      category: "thocam",
    },
    {
      id: "thocam-22",
      title: "Sơ mi nam 04",
      price: "1.450.000đ",
      images: ["Sơ mi nam 04.webp"],
      image: "Sơ mi nam 04.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Sơ mi nam",
      category: "thocam",
    },
    {
      id: "thocam-23",
      title: "Túi khoác vai",
      price: "180.000đ",
      images: ["Túi khoác vai.webp"],
      image: "Túi khoác vai.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Túi khoác vai",
      category: "thocam",
    },
    {
      id: "thocam-24",
      title: "Túi xách",
      price: "1.500.000đ",
      images: ["Túi xách.webp"],
      image: "Túi xách.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Túi xách",
      category: "thocam",
    },
    {
      id: "thocam-25",
      title: "Váy ngắn mã 01,02,03,04",
      price: "4.200.000đ",
      images: ["Váy_ngắn_mã_01_02_03_04.webp"],
      image: "Váy_ngắn_mã_01_02_03_04.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Váy ngắn",
      category: "thocam",
    },
    {
      id: "thocam-26",
      title: "Váy ngắn mã 05",
      price: "3.500.000đ",
      images: ["Váy ngắn mã 05.webp"],
      image: "Váy ngắn mã 05.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Váy ngắn",
      category: "thocam",
    },
    {
      id: "thocam-27",
      title: "Váy ngắn mã 06, 07",
      price: "4.200.000đ",
      images: ["Váy ngắn mã 06, 07.webp"],
      image: "Váy ngắn mã 06, 07.webp",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Váy ngắn",
      category: "thocam",
    },
  ],
  sanphamtuthong: [
    {
      id: "sanphamtuthong-1",
      title: "Vòng quả thông 01",
      price: "Liên hệ",
      images: ["Vòng quả thông 01.jpg"],
      image: "Vòng quả thông 01.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Vòng quả thông",
      category: "sanphamtuthong",
      size: "30cm x 1m", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-2",
      title: "Vòng quả thông 02",
      price: "Liên hệ",
      images: ["Vòng quả thông 02.jpg"],
      image: "Vòng quả thông 02.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Vòng quả thông",
      category: "sanphamtuthong",
      size: "30cm x 1m", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-3",
      title: "Vòng quả thông 03",
      price: "Liên hệ",
      images: ["Vòng quả thông 03.jpg"],
      image: "Vòng quả thông 03.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Vòng quả thông",
      category: "sanphamtuthong",
      size: "30cm x 1m", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-4",
      title: "Vòng quả thông 04",
      price: "Liên hệ",
      images: ["Vòng quả thông 04.jpg"],
      image: "Vòng quả thông 04.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Vòng quả thông",
      category: "sanphamtuthong",
      size: "30cm x 1m", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-5",
      title: "Vòng quả thông 05",
      price: "Liên hệ",
      images: ["Vòng quả thông 05.jpg"],
      image: "Vòng quả thông 05.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Vòng quả thông",
      category: "sanphamtuthong",
      size: "30cm x 1m", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-6",
      title: "Vòng quả thông 06",
      price: "Liên hệ",
      images: ["Vòng quả thông 06.jpg"],
      image: "Vòng quả thông 06.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Vòng quả thông",
      category: "sanphamtuthong",
      size: "30cm x 1m", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-7",
      title: "Vòng quả thông 08",
      price: "Liên hệ",
      images: ["Vòng quả thông 08.jpg"],
      image: "Vòng quả thông 08.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Vòng quả thông",
      category: "sanphamtuthong",
      size: "30cm x 1m", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-8",
      title: "Vòng quả thông 09",
      price: "Liên hệ",
      images: ["Vòng quả thông 09.jpg"],
      image: "Vòng quả thông 09.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Vòng quả thông",
      category: "sanphamtuthong",
      size: "30cm x 1m", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-9",
      title: "Vòng quả thông 10",
      price: "Liên hệ",
      images: ["Vòng quả thông 10.jpg"],
      image: "Vòng quả thông 10.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Vòng quả thông",
      category: "sanphamtuthong",
      size: "30cm x 1m", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-10",
      title: "Vòng quả thông 11",
      price: "Liên hệ",
      images: ["Vòng quả thông 11.jpg"],
      image: "Vòng quả thông 11.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Vòng quả thông",
      category: "sanphamtuthong",
      size: "30cm x 1m", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-11",
      title: "Tranh theo yêu cầu",
      price: "Liên hệ",
      images: ["Tranh theo yêu cầu 02.jpg"],
      image: "Tranh theo yêu cầu 02.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh theo yêu cầu",
      category: "sanphamtuthong",
      size: "", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-12",
      title: "Tranh mini",
      price: "110.000đ",
      images: ["Tranh mini.jpg"],
      image: "Tranh mini.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh mini",
      category: "sanphamtuthong",
      size: "10cm x 10cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-13",
      title: "Tranh mini 01",
      price: "110.000đ",
      images: ["Tranh mini 01.jpg"],
      image: "Tranh mini 01.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh mini",
      category: "sanphamtuthong",
      size: "10cm x 10cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-14",
      title: "Tranh mini 02",
      price: "110.000đ",
      images: ["Tranh mini 02.jpg"],
      image: "Tranh mini 02.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh mini",
      category: "sanphamtuthong",
      size: "10cm x 10cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-15",
      title: "Tranh độc bản 01",
      price: "Liên hệ",
      images: ["Tranh độc bản 01.jpg"],
      image: "Tranh độc bản 01.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh độc bản",
      category: "sanphamtuthong",
      size: "", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-16",
      title: "Tranh độc bản 02",
      price: "Liên hệ",
      images: ["Tranh độc bản 02.jpg"],
      image: "Tranh độc bản 02.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh độc bản",
      category: "sanphamtuthong",
      size: "", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-17",
      title: "Tranh độc bản 03",
      price: "Liên hệ",
      images: ["Tranh độc bản 03.jpg"],
      image: "Tranh độc bản 03.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh độc bản",
      category: "sanphamtuthong",
      size: "", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-18",
      title: "Tranh độc bản 04",
      price: "Liên hệ",
      images: ["Tranh độc bản 04.jpg"],
      image: "Tranh độc bản 04.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh độc bản",
      category: "sanphamtuthong",
      size: "", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-19",
      title: "Tranh độc bản 05",
      price: "Liên hệ",
      images: ["Tranh độc bản 05.jpg"],
      image: "Tranh độc bản 05.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh độc bản",
      category: "sanphamtuthong",
      size: "", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-20",
      title: "Tranh độc bản 06",
      price: "Liên hệ",
      images: ["Tranh độc bản 06.jpg"],
      image: "Tranh độc bản 06.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh độc bản",
      category: "sanphamtuthong",
      size: "", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-21",
      title: "Tranh A4 01",
      price: "700.000đ",
      images: ["Tranh A4 01.jpg"],
      image: "Tranh A4 01.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh A4",
      category: "sanphamtuthong",
      size: "20cmx30cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-22",
      title: "Tranh A4 02",
      price: "700.000đ",
      images: ["Tranh A4 02.jpg"],
      image: "Tranh A4 02.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh A4",
      category: "sanphamtuthong",
      size: "20cmx30cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-23",
      title: "Tranh A4 03",
      price: "700.000đ",
      images: ["Tranh A4 03.jpg"],
      image: "Tranh A4 03.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh A4",
      category: "sanphamtuthong",
      size: "20cmx30cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-24",
      title: "Tranh A4 04",
      price: "700.000đ",
      images: ["Tranh A4 04.jpg"],
      image: "Tranh A4 04.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh A4",
      category: "sanphamtuthong",
      size: "20cmx30cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-25",
      title: "Tranh A4 05",
      price: "700.000đ",
      images: ["Tranh A4 05.jpg"],
      image: "Tranh A4 05.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh A4",
      category: "sanphamtuthong",
      size: "20cmx30cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-26",
      title: "Tranh A4 06",
      price: "700.000đ",
      images: ["Tranh A4 06.jpg"],
      image: "Tranh A4 06.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh A4",
      category: "sanphamtuthong",
      size: "20cmx30cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-27",
      title: "Tranh A4 07",
      price: "700.000đ",
      images: ["Tranh A4 07.jpg"],
      image: "Tranh A4 07.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh A4",
      category: "sanphamtuthong",
      size: "20cmx30cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-28",
      title: "Tranh A4 08",
      price: "700.000đ",
      images: ["Tranh A4 08.jpg"],
      image: "Tranh A4 08.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh A4",
      category: "sanphamtuthong",
      size: "20cmx30cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-29",
      title: "Tranh A4 09",
      price: "700.000đ",
      images: ["Tranh A4 09.jpg"],
      image: "Tranh A4 09.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh A4",
      category: "sanphamtuthong",
      size: "20cmx30cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-30",
      title: "Tranh A4 10",
      price: "700.000đ",
      images: ["Tranh A4 10.jpg"],
      image: "Tranh A4 10.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh A4",
      category: "sanphamtuthong",
      size: "20cmx30cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-31",
      title: "Tranh A4 11",
      price: "700.000đ",
      images: ["Tranh A4 11.jpg"],
      image: "Tranh A4 11.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh A4",
      category: "sanphamtuthong",
      size: "20cmx30cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-32",
      title: "Tranh A4 12",
      price: "700.000đ",
      images: ["Tranh A4 12.jpg"],
      image: "Tranh A4 12.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh A4",
      category: "sanphamtuthong",
      size: "20cmx30cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-33",
      title: "Tranh A4 13",
      price: "700.000đ",
      images: ["Tranh A4 13.jpg"],
      image: "Tranh A4 13.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh A4",
      category: "sanphamtuthong",
      size: "20cmx30cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-34",
      title: "Tranh A4 14",
      price: "700.000đ",
      images: ["Tranh A4 14.jpg"],
      image: "Tranh A4 14.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh A4",
      category: "sanphamtuthong",
      size: "20cmx30cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-35",
      title: "Tranh A4 15",
      price: "700.000đ",
      images: ["Tranh A4 15.jpg"],
      image: "Tranh A4 15.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh A4",
      category: "sanphamtuthong",
      size: "20cmx30cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-36",
      title: "Tranh 40x40 01",
      price: "1.100.000đ",
      images: ["Tranh 40x40 (01).jpg"],
      image: "Tranh 40x40 (01).jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh 40x40",
      category: "sanphamtuthong",
      size: "40cmx40cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-37",
      title: "Tranh 40x40 02",
      price: "1.100.000đ",
      images: ["Tranh 40x40 (02).jpg"],
      image: "Tranh 40x40 (02).jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh 40x40",
      category: "sanphamtuthong",
      size: "40cmx40cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-38",
      title: "Tranh 40x40 03",
      price: "1.100.000đ",
      images: ["Tranh 40x40 (03).jpg"],
      image: "Tranh 40x40 (03).jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh 40x40",
      category: "sanphamtuthong",
      size: "40cmx40cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-39",
      title: "Tranh 40x40 04",
      price: "1.100.000đ",
      images: ["Tranh 40x40 (04).jpg"],
      image: "Tranh 40x40 (04).jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh 40x40",
      category: "sanphamtuthong",
      size: "40cmx40cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-40",
      title: "Tranh 40x40 05",
      price: "1.100.000đ",
      images: ["Tranh 40x40 (05).jpg"],
      image: "Tranh 40x40 (05).jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh 40x40",
      category: "sanphamtuthong",
      size: "40cmx40cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-41",
      title: "Tranh 20x20 01",
      price: "370.000đ",
      images: ["Tranh 20x20 (01).jpg"],
      image: "Tranh 20x20 (01).jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh 20x20",
      category: "sanphamtuthong",
      size: "20cmx20cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-42",
      title: "Tranh 20x20 02",
      price: "370.000đ",
      images: ["Tranh 20x20 (02).jpg"],
      image: "Tranh 20x20 (02).jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh 20x20",
      category: "sanphamtuthong",
      size: "20cmx20cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-43",
      title: "Tranh 20x20 03",
      price: "370.000đ",
      images: ["Tranh 20x20 (03).jpg"],
      image: "Tranh 20x20 (03).jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh 20x20",
      category: "sanphamtuthong",
      size: "20cmx20cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-44",
      title: "Tranh 20x20 04",
      price: "370.000đ",
      images: ["Tranh 20x20 (04).jpg"],
      image: "Tranh 20x20 (04).jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh 20x20",
      category: "sanphamtuthong",
      size: "20cmx20cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-45",
      title: "Tranh 15x20 01",
      price: "370.000đ",
      images: ["Tranh 15x20 (01).jpg"],
      image: "Tranh 15x20 (01).jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh 15x20",
      category: "sanphamtuthong",
      size: "15cmx20cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-46",
      title: "Tranh 15x20 02",
      price: "370.000đ",
      images: ["Tranh 15x20 (02).jpg"],
      image: "Tranh 15x20 (02).jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh 15x20",
      category: "sanphamtuthong",
      size: "15cmx20cm", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-47",
      title: "Móc khóa 01",
      price: "50.000đ",
      images: ["moc khoa 01.jpg"],
      image: "moc khoa 01.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Móc khóa",
      category: "sanphamtuthong",
      size: "", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-48",
      title: "Móc khóa 02",
      price: "50.000đ",
      images: ["moc khoa 02.jpg"],
      image: "moc khoa 02.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Móc khóa",
      category: "sanphamtuthong",
      size: "", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-49",
      title: "Lọ hoa lớn 01",
      price: "1.200.000đ",
      images: ["Lọ hoa lớn 01.jpg"],
      image: "Lọ hoa lớn 01.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Lọ hoa lớn",
      category: "sanphamtuthong",
      size: "", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-50",
      title: "Lọ hoa lớn 02",
      price: "1.200.000đ",
      images: ["Lọ hoa lớn 02.jpg"],
      image: "Lọ hoa lớn 02.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Lọ hoa lớn",
      category: "sanphamtuthong",
      size: "", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-51",
      title: "Lọ hoa bé 01",
      price: "370.000đ",
      images: ["Lo hoa bé 01.jpg"],
      image: "Lo hoa bé 01.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Lọ hoa bé",
      category: "sanphamtuthong",
      size: "", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-52",
      title: "Lọ hoa bé 02",
      price: "370.000đ",
      images: ["Lo hoa bé 02.jpg"],
      image: "Lo hoa bé 02.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Lọ hoa bé",
      category: "sanphamtuthong",
      size: "", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-53",
      title: "Lọ hoa bé 03",
      price: "370.000đ",
      images: ["Lo hoa bé 03.jpg"],
      image: "Lo hoa bé 03.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Lọ hoa bé",
      category: "sanphamtuthong",
      size: "", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-54",
      title: "Lọ hoa bé 04",
      price: "370.000đ",
      images: ["Lo hoa bé 04.jpg"],
      image: "Lo hoa bé 04.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Lọ hoa bé",
      category: "sanphamtuthong",
      size: "", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-55",
      title: "Lọ hoa bé 05",
      price: "370.000đ",
      images: ["Lo hoa bé 05.jpg"],
      image: "Lo hoa bé 05.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Lọ hoa bé",
      category: "sanphamtuthong",
      size: "", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-56",
      title: "Lọ hoa bé 06",
      price: "370.000đ",
      images: ["Lo hoa bé 06.jpg"],
      image: "Lo hoa bé 06.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Lọ hoa bé",
      category: "sanphamtuthong",
      size: "", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-57",
      title: "Lọ hoa bé 07",
      price: "370.000đ",
      images: ["Lo hoa bé 07.jpg"],
      image: "Lo hoa bé 07.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Lọ hoa bé",
      category: "sanphamtuthong",
      size: "", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-58",
      title: "Lọ hoa bé 08",
      price: "370.000đ",
      images: ["Lo hoa bé 08.jpg"],
      image: "Lo hoa bé 08.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Lọ hoa bé",
      category: "sanphamtuthong",
      size: "", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-59",
      title: "Lọ hoa bé 09",
      price: "370.000đ",
      images: ["Lo hoa bé 09.jpg"],
      image: "Lo hoa bé 09.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Lọ hoa bé",
      category: "sanphamtuthong",
      size: "", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-60",
      title: "Bó hoa 1 bông",
      price: "50.000đ",
      images: ["bó hoa 1 bong.jpg"],
      image: "bó hoa 1 bong.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Bó hoa 1 bông",
      category: "sanphamtuthong",
      size: "", // Thêm kích thước sản phẩm
    },
    {
      id: "sanphamtuthong-61",
      title: "Tranh 50x50",
      price: "2.000.000đ",
      images: ["Tranh 50x50.jpg"],
      image: "Tranh 50x50.jpg",
      isNew: true,
      isTrending: true,
      artist: "Musée Du Pin",
      publishYear: "2025",
      type: "Tranh 50x50",
      category: "sanphamtuthong",
      size: "50cmx50cm", // Thêm kích thước sản phẩm
    },
  ],
};

const filterCategories = {
  khuyentai: {
    types: [{ name: "Khuyên tai", count: 43 }],
    artists: [{ name: "Musée Du Pin", count: 43 }],
    publishYears: ["2025"],
  },
  anpham: {
    types: [
      { name: "Tuổi thơ", count: 1 },
      { name: "Dâu tây", count: 1 },
      { name: "Hoa ban trắng", count: 1 },
    ],
    artists: [{ name: "Musée Du Pin", count: 1 }],
    publishYears: ["2025"],
  },
  "hoi-thao-nghe-thuat": {
    types: [{ name: "Tay nặn tay vẽ", count: 1 }],
    artists: [{ name: "Musée Du Pin", count: 1 }],
    publishYears: ["2025"],
  },
  "in-theo-yeu-cau": {
    types: [{ name: "In tranh nghệ thuật", count: 1 }],
    artists: [{ name: "Musée Du Pin", count: 1 }],
    publishYears: ["2025"],
  },
  "thoi-trang-va-phu-kien": {
    types: [{ name: "Áo phông nam", count: 1 }],
    artists: [{ name: "Musée Du Pin", count: 1 }],
    publishYears: ["2025"],
  },
  thocam: {
    types: [
      { name: "Cravat", count: 4 },
      { name: "Đầm trẻ em", count: 2 },
      { name: "Gối trang trí", count: 2 },
      { name: "Hộp bút", count: 1 },
      { name: "Kẹp tóc", count: 2 },
      { name: "Set hộp đồ trang điểm", count: 1 },
      { name: "Sơ mi nam", count: 4 },
      { name: "Túi khoác vai", count: 1 },
      { name: "Túi xách", count: 1 },
      { name: "Váy ngắn", count: 3 },
    ],
    artists: [{ name: "Musée Du Pin", count: 21 }],
    publishYears: ["2025"],
  },
  sanphamtuthong: {
    types: [
      { name: "Vòng quả thông", count: 3 },
      { name: "Tranh độc bản", count: 6 },
      { name: "Tranh A4", count: 15 },
      { name: "Tranh 40x40", count: 5 },
      { name: "Tranh 20x20", count: 2 },
      { name: "Tranh 15x20", count: 2 },
      { name: "Móc khóa", count: 2 },
      { name: "Lọ hoa lớn", count: 2 },
      { name: "Lọ hoa bé", count: 9 },
      { name: "Bó hoa 1 bông", count: 1 },
      { name: "Tranh 50x50", count: 1 },
    ],
    artists: [{ name: "Musée Du Pin", count: 48 }],
    publishYears: ["2025"],
  },
};

const categoryData = {
  khuyentai: {
    title: "Khuyên tai",
    subtitle:
      "Khuyên tai là một trong những món trang sức được ưa chuộng nhất trong thời gian gần đây. Đây là một trong những món trang sức được ưa chuộng nhất trong thời gian gần đây. Đây là một trong những món trang sức được ưa chuộng nhất trong thời gian gần đây.",
    heroImage: "MDP-1140241.webp",
  },
  anpham: {
    title: "Ấn phẩm",
    subtitle:
      "Ấn phẩm nghệ thuật, mở ra một trang mới, một cuộc hành trình đầy thú vị tại Musée Du Pin",
    heroImage: "dautaybackground.png",
  },
  "hoi-thao-nghe-thuat": {
    title: "Hội thảo nghệ thuật",
    subtitle:
      "Hội thảo nghệ thuật mang đến những trải nghiệm thú vị và bổ ích, giúp bạn khám phá và hiểu sâu hơn về nghệ thuật tại Musée Du Pin",
    heroImage: "hoithaonghethuat.jpg",
  },
  "in-theo-yeu-cau": {
    title: "In theo yêu cầu",
    subtitle:
      "Biến ý tưởng của bạn thành hiện thực với dịch vụ in ấn chất lượng cao, tùy chỉnh theo mọi nhu cầu",
    heroImage: "BTT01405-HDR.webp",
  },
  "thoi-trang-va-phu-kien": {
    title: "Thời trang và phụ kiện",
    subtitle:
      "Phong cách thời thượng kết hợp với nghệ thuật đương đại, tạo nên những thiết kế độc đáo và sang trọng",
    heroImage: "aophongbackground.jpg",
  },
  thocam: {
    title: "Thổ cẩm",
    subtitle:
      "Sản phẩm Thổ cẩm mang đậm sắc đồng bào K'ho được thiết kế đẹp mắt, giản dị",
    heroImage: "Váy ngắn mã 05.webp",
  },
  sanphamtuthong: {
    title: "Sản phẩm từ thông",
    subtitle:
      "Sản phẩm được thiết kế từ Thông, nét đặc trưng cùng vẻ đẹp thiên nhiên được Musée Du Pin khắc họa tạo nên các sản phẩm tuyệt đẹp.",
    heroImage: "Tranh A4 04.jpg",
  },
};

// Helper function to get image URL based on category
const getImageUrl = (category, filename) => {
  switch (category) {
    case "khuyentai":
      return getKhuyenTaiImageUrl(filename);
    case "anpham":
      return getAnPhamImageUrl(filename);
    case "in-theo-yeu-cau":
      return getInTheoYeuCauImageUrl(filename);
    case "hoi-thao-nghe-thuat":
      return getHoiThaoNgheThuatImageUrl(filename);
    case "thoi-trang-va-phu-kien":
      return getThoiTrangImageUrl(filename);
    case "thocam":
      return getThoCamImageUrl(filename);
    case "sanphamtuthong":
      return getSanPhamTuThongImageUrl(filename);
    default:
      return "";
  }
};

const CategoryDetail = () => {
  const { categoryId } = useParams();
  const category = categoryData[categoryId];
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);

  // Load recently viewed products from localStorage on component mount
  useEffect(() => {
    const storedProducts = JSON.parse(
      localStorage.getItem("recentlyViewedProducts") || "[]"
    );
    setRecentlyViewedProducts(storedProducts);
  }, []);

  // Function to add a product to recently viewed
  const addToRecentlyViewed = (product) => {
    setRecentlyViewedProducts((prevProducts) => {
      // Remove the product if it already exists
      const filteredProducts = prevProducts.filter((p) => p.id !== product.id);
      // Add the product to the beginning of the array
      const newProducts = [product, ...filteredProducts].slice(0, 10); // Keep only the last 10 products
      // Save to localStorage
      localStorage.setItem(
        "recentlyViewedProducts",
        JSON.stringify(newProducts)
      );
      return newProducts;
    });
  };

  // Function to remove a product from recently viewed
  const removeFromRecentlyViewed = (productId) => {
    setRecentlyViewedProducts((prevProducts) => {
      const newProducts = prevProducts.filter((p) => p.id !== productId);
      localStorage.setItem(
        "recentlyViewedProducts",
        JSON.stringify(newProducts)
      );
      return newProducts;
    });
  };

  // Calculate min and max prices from products
  const priceRange = useMemo(() => {
    const prices = (sampleProducts[categoryId] || [])
      .map((product) => {
        if (product.price === "Liên hệ") return 0;
        return parseInt(product.price.replace(/[^\d]/g, "")) || 0;
      })
      .filter((price) => price > 0); // Chỉ lấy giá có giá trị số

    return {
      min: prices.length > 0 ? Math.min(...prices) : 0,
      max: prices.length > 0 ? Math.max(...prices) : 0,
      hasContactPrice: (sampleProducts[categoryId] || []).some(
        (product) => product.price === "Liên hệ"
      ),
    };
  }, [categoryId]);

  const [openSections, setOpenSections] = useState({
    types: false,
    artists: false,
    publishYears: false,
    priceRange: false,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    types: [],
    artists: [],
    publishYears: [],
    priceRange: [priceRange.min, priceRange.max],
  });

  const [filteredProducts, setFilteredProducts] = useState(
    sampleProducts[categoryId] || []
  );
  const [filteredCount, setFilteredCount] = useState(
    sampleProducts[categoryId].length
  );

  const [previewCount, setPreviewCount] = useState(
    sampleProducts[categoryId].length
  );

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Filter products based on current filters
  const filterProducts = (products, filters) => {
    return products.filter((product) => {
      const typeMatch =
        filters.types.length === 0 || filters.types.includes(product.type);

      const artistMatch =
        filters.artists.length === 0 ||
        filters.artists.includes(product.artist);

      const yearMatch =
        filters.publishYears.length === 0 ||
        filters.publishYears.includes(product.publishYear);

      // Xử lý lọc theo giá
      let priceMatch = true;
      if (product.price !== "Liên hệ") {
        const price = parseInt(product.price.replace(/[^\d]/g, "")) || 0;
        priceMatch =
          price >= filters.priceRange[0] && price <= filters.priceRange[1];
      }

      return typeMatch && artistMatch && yearMatch && priceMatch;
    });
  };

  // Calculate counts for each filter option based on current filtered products
  const calculateFilterCounts = () => {
    const counts = {
      types: {},
      artists: {},
      publishYears: {},
    };

    // Đếm số lượng từ tất cả sản phẩm trong danh mục
    const allCategoryProducts = sampleProducts[categoryId] || [];

    allCategoryProducts.forEach((product) => {
      // Đếm theo type
      if (product.type) {
        counts.types[product.type] = (counts.types[product.type] || 0) + 1;
      }

      // Đếm theo artist
      if (product.artist) {
        counts.artists[product.artist] =
          (counts.artists[product.artist] || 0) + 1;
      }

      // Đếm theo năm
      if (product.publishYear) {
        counts.publishYears[product.publishYear] =
          (counts.publishYears[product.publishYear] || 0) + 1;
      }
    });

    return counts;
  };

  // Cập nhật phần hiển thị trong modal
  const getTypeCount = (typeName) => {
    const allCategoryProducts = sampleProducts[categoryId] || [];
    return allCategoryProducts.filter((product) => product.type === typeName)
      .length;
  };

  const getArtistCount = (artistName) => {
    const allCategoryProducts = sampleProducts[categoryId] || [];
    return allCategoryProducts.filter(
      (product) => product.artist === artistName
    ).length;
  };

  const getYearCount = (year) => {
    const allCategoryProducts = sampleProducts[categoryId] || [];
    return allCategoryProducts.filter((product) => product.publishYear === year)
      .length;
  };

  // Update preview count whenever filters change
  useEffect(() => {
    const filtered = filterProducts(
      sampleProducts[categoryId],
      selectedFilters
    );
    setPreviewCount(filtered.length);
    calculateFilterCounts();
  }, [selectedFilters, categoryId]);

  // Toggle section open/close
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Apply filters
  const applyFilters = () => {
    const filtered = filterProducts(
      sampleProducts[categoryId],
      selectedFilters
    );
    setFilteredProducts(filtered);
    setFilteredCount(filtered.length);
    setPreviewCount(filtered.length);
    setShowFilters(false);
  };

  // Reset filters
  const resetFilters = () => {
    const initialFilters = {
      types: [],
      artists: [],
      publishYears: [],
      priceRange: [priceRange.min, priceRange.max],
    };
    setSelectedFilters(initialFilters);
    const filtered = filterProducts(sampleProducts[categoryId], initialFilters);
    setFilteredProducts(filtered);
    setFilteredCount(filtered.length);
    setPreviewCount(filtered.length);
    calculateFilterCounts();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".sort-dropdown-container")) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const productsPerPage = 20;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleSortChange = (order) => {
    setSortOrder(order);
    setShowSortDropdown(false);

    const sorted = [...filteredProducts].sort((a, b) => {
      if (order === "default") {
        return a.id - b.id; // Return to original order
      }
      const priceA = parseInt(a.price.replace(/\D/g, ""));
      const priceB = parseInt(b.price.replace(/\D/g, ""));
      return order === "asc" ? priceA - priceB : priceB - priceA;
    });
    setFilteredProducts(sorted);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (!category) {
    return <div>Category not found</div>;
  }

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Kiểm tra xem có filter nào được chọn không
  const hasActiveFilters = () => {
    return (
      selectedFilters.types.length > 0 ||
      selectedFilters.artists.length > 0 ||
      selectedFilters.publishYears.length > 0 ||
      selectedFilters.priceRange[0] !== priceRange.min ||
      selectedFilters.priceRange[1] !== priceRange.max
    );
  };

  return (
    <div className="category-detail">
      <Link to="/" className="back-button">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 12H5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 19L5 12L12 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Quay lại</span>
      </Link>

      <div className="hero-section-category">
        <div className="hero-image-category-container">
          <img
            src={getImageUrl(categoryId, category.heroImage)}
            alt={category.title}
            className="hero-image-category"
          />
          <div className="hero-content-category">
            <h3>{category.title}</h3>
            <p>{category.subtitle}</p>
          </div>
        </div>
      </div>

      <section className="list-item-categories">
        <div className="sort-categories">
          <div className="total-products">
            <span className="total-count">{filteredCount}</span>
            <span>sản phẩm</span>
          </div>
          <div className="sort-dropdown-container">
            <div
              className={`sort-dropdown-header ${
                showSortDropdown ? "active" : ""
              }`}
              onClick={() => setShowSortDropdown(!showSortDropdown)}
            >
              i
              <span>
                Sắp xếp theo:{" "}
                {sortOrder === "asc"
                  ? "giá tăng dần"
                  : sortOrder === "desc"
                  ? "giá đang giảm dần"
                  : "lựa chọn của chúng tôi"}
              </span>
              <RiArrowDropDownLine
                className={showSortDropdown ? "rotated" : ""}
              />
            </div>
            {showSortDropdown && (
              <div className="sort-dropdown-menu">
                <div
                  className={`sort-option ${
                    sortOrder === "default" ? "active" : ""
                  }`}
                  onClick={() => handleSortChange("default")}
                >
                  <strong> lựa chọn của chúng tôi </strong>
                </div>
                <div
                  className={`sort-option ${
                    sortOrder === "asc" ? "active" : ""
                  }`}
                  onClick={() => handleSortChange("asc")}
                >
                  giá tăng dần
                </div>
                <div
                  className={`sort-option ${
                    sortOrder === "desc" ? "active" : ""
                  }`}
                  onClick={() => handleSortChange("desc")}
                >
                  giá đang giảm dần
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="products-grid">
          {currentProducts.map((product, index) => (
            <React.Fragment key={product.id}>
              <Link
                to={`/product/${product.id}`}
                className="product-card"
                onClick={() => addToRecentlyViewed(product)}
              >
                <div className="product-image-container">
                  {product.isNew && <span className="tag new">Mới</span>}
                  {product.isTrending && (
                    <span className="tag trending">Thịnh hành</span>
                  )}
                  <img
                    src={getImageUrl(product.category, product.image)}
                    alt={product.title}
                  />
                </div>
                <h3>{product.title}</h3>
                <p className="price">{product.price}</p>
                {product.size && (
                  <p className="product-size">Kích thước: {product.size}</p>
                )}
              </Link>
              {index === 9 && filteredProducts.length > 10 && (
                <div className="block-product">
                  <Link
                    to={`/product/${filteredProducts[10].id}`}
                    className="featured-product"
                    onClick={() => addToRecentlyViewed(filteredProducts[10])}
                  >
                    <img
                      src={getImageUrl(
                        filteredProducts[10].category,
                        filteredProducts[10].image
                      )}
                      alt={filteredProducts[10].title}
                    />
                    <div className="featured-content">
                      <h3>{filteredProducts[10].title}</h3>
                      <p className="price">{filteredProducts[10].price}</p>
                    </div>
                  </Link>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Only show load more button if there are more products to display */}
        {currentPage * productsPerPage < filteredProducts.length && (
          <div className="load-more">
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Xem thêm sản phẩm <GoPlus />
            </button>
          </div>
        )}

        <div className="result-pager">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <MdKeyboardArrowRight />
          </button>
          <button
            onClick={() =>
              handlePageChange(Math.min(currentPage + 10, totalPages))
            }
            disabled={currentPage + 10 > totalPages}
          >
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
      </section>

      {/* Recently Viewed Products Section */}
      {recentlyViewedProducts.length > 0 && (
        <section className="productreseen">
          <h2>Các sản phẩm đã xem gần đây</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
          >
            {recentlyViewedProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="product-card-reseen">
                  <button
                    className="remove-product"
                    onClick={() => removeFromRecentlyViewed(product.id)}
                  >
                    <IoMdClose />
                  </button>
                  <Link to={`/product/${product.id}`}>
                    <div className="product-image-container">
                      <img
                        src={getImageUrl(product.category, product.image)}
                        alt={product.title}
                      />
                    </div>
                    <h3>{product.title}</h3>
                    <p className="price">{product.price}</p>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      <button
        className="filter-button"
        onClick={() => {
          setShowFilters(true);
          if (!showFilters) {
            resetFilters();
          }
        }}
      >
        {showFilters ? `Kết quả (${previewCount})` : "Bộ lọc"}
      </button>

      {showFilters && (
        <div className="search-filters-modal">
          <div className="search-filters-content">
            <div className="search-filters-header">
              <h2 className="search-filters-title">Bộ lọc</h2>
              <button
                className="close-filters-button"
                onClick={() => setShowFilters(false)}
                aria-label="Đóng bộ lọc"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Types Section */}
            <div className="filter-section">
              <div
                className="filter-header"
                onClick={() => toggleSection("types")}
              >
                <h3>Thể loại</h3>
                <RiArrowDropDownLine
                  className={openSections.types ? "rotated" : ""}
                />
              </div>
              {openSections.types && (
                <div className="filter-options">
                  {filterCategories[categoryId]?.types.map((type) => (
                    <label key={type.name} className="filter-option">
                      <input
                        type="checkbox"
                        checked={selectedFilters.types.includes(type.name)}
                        onChange={(e) => {
                          const newTypes = e.target.checked
                            ? [...selectedFilters.types, type.name]
                            : selectedFilters.types.filter(
                                (t) => t !== type.name
                              );
                          setSelectedFilters((prev) => ({
                            ...prev,
                            types: newTypes,
                          }));
                        }}
                      />
                      <span>{type.name}</span>
                      <span className="count">({getTypeCount(type.name)})</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Artists Section */}
            <div className="filter-section">
              <div
                className="filter-header"
                onClick={() => toggleSection("artists")}
              >
                <h3>Nghệ sĩ</h3>
                <RiArrowDropDownLine
                  className={openSections.artists ? "rotated" : ""}
                />
              </div>
              {openSections.artists && (
                <div className="filter-options">
                  {filterCategories[categoryId]?.artists.map((artist) => (
                    <label key={artist.name} className="filter-option">
                      <input
                        type="checkbox"
                        checked={selectedFilters.artists.includes(artist.name)}
                        onChange={(e) => {
                          const newArtists = e.target.checked
                            ? [...selectedFilters.artists, artist.name]
                            : selectedFilters.artists.filter(
                                (a) => a !== artist.name
                              );
                          setSelectedFilters((prev) => ({
                            ...prev,
                            artists: newArtists,
                          }));
                        }}
                      />
                      <span>{artist.name}</span>
                      <span className="count">
                        ({getArtistCount(artist.name)})
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Publish Years Section */}
            <div className="filter-section">
              <div
                className="filter-header"
                onClick={() => toggleSection("publishYears")}
              >
                <h3>Thời gian xuất bản</h3>
                <RiArrowDropDownLine
                  className={openSections.publishYears ? "rotated" : ""}
                />
              </div>
              {openSections.publishYears && (
                <div className="filter-options">
                  {filterCategories[categoryId]?.publishYears.map((year) => (
                    <label key={year} className="filter-option">
                      <input
                        type="checkbox"
                        checked={selectedFilters.publishYears.includes(year)}
                        onChange={(e) => {
                          const newYears = e.target.checked
                            ? [...selectedFilters.publishYears, year]
                            : selectedFilters.publishYears.filter(
                                (y) => y !== year
                              );
                          setSelectedFilters((prev) => ({
                            ...prev,
                            publishYears: newYears,
                          }));
                        }}
                      />
                      <span>{year}</span>
                      <span className="count">({getYearCount(year)})</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range Section */}
            <div className="filter-section">
              <div
                className="filter-header"
                onClick={() => toggleSection("priceRange")}
              >
                <h3>Giá cả</h3>
                <RiArrowDropDownLine
                  className={openSections.priceRange ? "rotated" : ""}
                />
              </div>
              {openSections.priceRange && (
                <div className="price-range-slider">
                  <div className="price-range-inputs">
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={selectedFilters.priceRange[0]}
                      onChange={(e) => {
                        const minValue = parseInt(e.target.value);
                        setSelectedFilters((prev) => ({
                          ...prev,
                          priceRange: [
                            Math.min(minValue, prev.priceRange[1]),
                            prev.priceRange[1],
                          ],
                        }));
                      }}
                    />
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={selectedFilters.priceRange[1]}
                      onChange={(e) => {
                        const maxValue = parseInt(e.target.value);
                        setSelectedFilters((prev) => ({
                          ...prev,
                          priceRange: [
                            prev.priceRange[0],
                            Math.max(maxValue, prev.priceRange[0]),
                          ],
                        }));
                      }}
                    />
                  </div>
                  <div className="price-range-values">
                    <span>{formatPrice(selectedFilters.priceRange[0])}</span>
                    <span>{formatPrice(selectedFilters.priceRange[1])}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            className="apply-filters-button"
            onClick={applyFilters}
            disabled={previewCount === 0}
          >
            Kết quả ({previewCount})
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;
